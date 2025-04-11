/** Account Utility Methods */

const mongoose = require("mongoose");
const logger = require("../logger"); // Import logger

const { Account, Transaction } = require("../../db");

const getUserBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    /** Invalid account / Account Not Found */
    if (!account) {
      return res.status(404).json({
        message: "Invalid Request. User Account Not Found",
      });
    }

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    logger.error(`Error fetching balance`, error);
    return res.status(411).json({
      message: `Error while fetching balance`,
    });
  }
};

const transferFunds = async (req, res) => {
  /** Creating transaction */
  const session = await mongoose.startSession(); // Define session variable

  /** Start Transaction */
  session.startTransaction();
  
  const { to, amount } = req.body;
  const receiver = to;
  const sender = req.userId;

  try {
    const transaction = new Transaction({
      receiverId: receiver,
      senderId: sender,
      amount: amount,
      transactionType: "debit",
      statusHistory: [{ status: "pending" }],
    });

    await transaction.save({ session });

    const senderAcc = await Account.findOne({ userId: sender }).session(
      session
    );

    /** Aborting transaction if user not found or insufficient balance */
    if (!senderAcc || senderAcc.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: `Insufficient balance`,
      });
    }

    const receiverAcc = await Account.findOne({ userId: receiver }).session(
      session
    );

    /** Checking if Recipient Exists in Db */
    if (!receiverAcc) {
      await session.abortTransaction();
      return res.status(400).json({
        message: `Aborting Session Recipient doesn't exist / Account Not found`,
      });
    }

    /** Performing Transaction */
    /** Handling concurrent request trial of user to transfer fund to multiple user at same time */
    const updateSenderFund = await Account.findOneAndUpdate(
      {
        userId: sender,
        __v: senderAcc.__v,
      },
      {
        $inc: { balance: -amount },
        $set: { __v: senderAcc.__v + 1 },
      },
      { session, new: true }
    );

    /** This checks if multiple request transfer request is created by sender at same time */
    if (!updateSenderFund) {
      await session.abortTransaction();
      return res.status(409).json({
        message: `Transaction conflict: Trying multiple request at same time`,
      });
    }

    await Account.findOneAndUpdate(
      { userId: to },
      {
        $inc: { balance: amount },
      },
      { session }
    );

    transaction.statusHistory.push({
      status: "completed",
      timestamp: new Date(),
    });

    // Save the transaction with the updated status
    await transaction.save({ session });

    /** Committing Transaction | End transaction */
    await session.commitTransaction();

    return res.status(200).json({
      balance: updateSenderFund.balance,
      message: `Transfer Successful`,
    });
  } catch (error) {
    logger.error(`Error in transaction`, error);
    if (session) {
      await session.abortTransaction();
    }

    /** Handling Transaction Error */
    // Log the failed transaction
    const failedTransaction = new Transaction({
      senderId: sender,
      receiverId: receiver,
      amount: amount,
      transactionType: "debit",
      statusHistory: [
        { status: "pending" },
        { status: "failed", timestamp: new Date() },
      ],
    });

    await failedTransaction.save();

    return res.status(500).json({
      message: `Failed transaction`,
    });
  } finally {
    /** If session is there end the session, do not hold the thread for it to complete */
    if (session) {
      session.endSession();
    }
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "users", // collection name to join with
          localField: "receiver", // field in trnansaction collection to match with
          foreignField: "_id", // field in users collection to match with
          as: "receiverDetails", // output array field for receiver details
        },
      },
      {
        $unwind: "$receiverDetails",
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          transactionType: 1,
          statusHistory: 1,
          createdAt: 1,
          receiverDetails: {
            firstName: 1,
            lastName: 1,
            email: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    logger.error(`Error fetching transaction history`, error);
    return res.status(500).json({
      message: `Error while fetching transaction history`,
    });
  }
};

module.exports = {
  getUserBalance,
  transferFunds,
  getTransactionHistory,
};
