/** Account Utility Methods */

const mongoose = require("mongoose");

const { Account } = require("../../db");

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
    console.log(`Error fetching balance`, error);
    return res.status(411).json({
      message: `Error while fetching balance`,
    });
  }
};

const transferFunds = async (req, res) => {
  try {
    /** Creating transaction */
    const session = await mongoose.startSession();

    /** Start Transaction */
    session.startTransaction();

    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    /** Aborting transaction if user not found or insufficient balance */
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: `Insufficient balance`,
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    /** Checking if Recipient Exists in Db */
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: `Aborting Session Recipient doesn't exist / Account Not found`,
      });
    }

    /** Performing Transaction */
    /** Handling concurrent request trial of user to transfer fund to multiple user at same time */
    const updateSenderFund = await Account.findOneAndUpdate(
      {
        userId: req.userId,
        __v: account.__v,
      },
      {
        $inc: { balance: -amount },
        $set: { __v: account.__v + 1 },
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

    /** Committing Transaction | End transaction */
    await session.commitTransaction();

    return res.status(200).json({
      message: `Transfer Successful`,
    });
  } catch (error) {
    console.log(`Error in transaction`, error);
    if (session) {
      await session.abortTransaction();
    }
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

module.exports = {
  getUserBalance,
  transferFunds,
};
