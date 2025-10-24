/** Account Utility Methods */

const mongoose = require("mongoose");
const logger = require("../logger"); // Import logger

const { Account, Transaction } = require("../../db");

const getUserBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

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
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount, category } = req.body;
  const receiver = to;
  const sender = req.userId;

  try {
    const transaction = new Transaction({
      receiverId: receiver,
      senderId: sender,
      amount: amount,
      category: category,
      transactionType: "debit",
      statusHistory: [{ status: "pending" }],
    });

    await transaction.save({ session });

    const senderAcc = await Account.findOne({
      userId: sender,
    }).session(session);

    // ❌ Insufficient Balance or Sender not found
    if (!senderAcc || senderAcc.balance < amount) {
      await session.abortTransaction();

      await new Transaction({
        receiverId: receiver,
        senderId: sender,
        amount,
        category,
        transactionType: "debit",
        statusHistory: [
          { status: "pending" },
          {
            status: "failed",
            timestamp: new Date(),
            reason: "Insufficient balance",
          },
        ],
      }).save();

      return res
        .status(400)
        .json({ message: `Insufficient balance` });
    }

    const receiverAcc = await Account.findOne({
      userId: receiver,
    }).session(session);

    // ❌ Receiver Not Found
    if (!receiverAcc) {
      await session.abortTransaction();

      await new Transaction({
        receiverId: receiver,
        senderId: sender,
        amount,
        category,
        transactionType: "debit",
        statusHistory: [
          { status: "pending" },
          {
            status: "failed",
            timestamp: new Date(),
            reason: "Receiver not found",
          },
        ],
      }).save();

      return res.status(400).json({
        message: `Aborting Session Recipient doesn't exist / Account Not found`,
      });
    }

    // Perform sender account update with version check
    const updateSenderFund = await Account.findOneAndUpdate(
      { userId: sender, __v: senderAcc.__v },
      {
        $inc: { balance: -amount },
        $set: { __v: senderAcc.__v + 1 },
      },
      { session, new: true }
    );

    // ❌ Concurrent modification conflict
    if (!updateSenderFund) {
      await session.abortTransaction();

      await new Transaction({
        receiverId: receiver,
        senderId: sender,
        amount,
        category,
        transactionType: "debit",
        statusHistory: [
          { status: "pending" },
          {
            status: "failed",
            timestamp: new Date(),
            reason: "Version conflict",
          },
        ],
      }).save();

      return res.status(409).json({
        message: `Transaction conflict: Trying multiple request at same time`,
      });
    }

    // ✅ Update receiver account
    await Account.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    // ✅ Update transaction status to completed
    transaction.statusHistory.push({
      status: "completed",
      timestamp: new Date(),
    });

    await transaction.save({ session });

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

    // Catch-all failure logger
    await new Transaction({
      receiverId: receiver,
      senderId: sender,
      amount,
      category,
      transactionType: "debit",
      statusHistory: [
        { status: "pending" },
        {
          status: "failed",
          timestamp: new Date(),
          reason: "Internal error",
        },
      ],
    }).save();

    return res.status(500).json({
      message: `Failed transaction`,
    });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId; // Assuming `req.userId` contains the user's `_id`

    const objectId = new mongoose.Types.ObjectId(userId);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          $or: [
            { receiverId: objectId },
            { senderId: objectId },
          ],
        },
      },
      {
        $addFields: {
          transactionType: {
            $cond: [
              { $eq: ["$receiverId", objectId] },
              "credit",
              "debit",
            ],
          },
        },
      },
      // Lookup receiver details
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      {
        $unwind: {
          path: "$receiverDetails",
          preserveNullAndEmptyArrays: true, // ✅ Important for robustness
        },
      },
      // Lookup sender details
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      {
        $unwind: {
          path: "$senderDetails",
          preserveNullAndEmptyArrays: true, // ✅ Important for robustness
        },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          transactionType: 1,
          status: {
            $let: {
              vars: {
                lastStatus: {
                  $arrayElemAt: [
                    "$statusHistory",
                    {
                      $subtract: [
                        { $size: "$statusHistory" },
                        1,
                      ],
                    },
                  ],
                },
              },
              in: "$$lastStatus.status",
            },
          },
          createdAt: 1,
          category: 1,
          receiverEmail: "$receiverDetails.email",
          receiverName: {
            $concat: [
              {
                $ifNull: ["$receiverDetails.firstName", ""],
              },
              " ",
              {
                $ifNull: ["$receiverDetails.lastName", ""],
              },
            ],
          },
          senderEmail: "$senderDetails.email",
          senderName: {
            $concat: [
              { $ifNull: ["$senderDetails.firstName", ""] },
              " ",
              { $ifNull: ["$senderDetails.lastName", ""] },
            ],
          },
        },
      },
    ]);

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    logger.error(
      `Error fetching transaction history`,
      error
    );
    return res.status(500).json({
      message: `Error while fetching transaction history`,
    });
  }
};

const addMoneyToWallet = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount } = req.body;
  const userId = req.userId;

  try {
    const account = await Account.findOne({
      userId,
    }).session(session);

    if (!account) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ message: "User account not found" });
    }

    // Update account balance
    account.balance += amount;
    const updatedAcc = await account.save({ session });

    // Create transaction record
    const transaction = new Transaction({
      receiverId: userId,
      senderId: userId,
      amount,
      category: "wallet",
      transactionType: "credit",
      statusHistory: [{ status: "completed" }],
    });

    await transaction.save({ session });

    await session.commitTransaction();

    return res.status(200).json({
      balance: updatedAcc.balance,
      message: `Money added successfully`,
    });
  } catch (error) {
    logger.error(`Error adding money to wallet`, error);
    if (session) {
      await session.abortTransaction();
    }
    return res.status(500).json({
      message: `Failed to add money to wallet`,
    });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

module.exports = {
  getUserBalance,
  transferFunds,
  getTransactionHistory,
  addMoneyToWallet,
};
