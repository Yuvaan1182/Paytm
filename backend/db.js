const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const logger = require("./utils/logger"); // Import logger

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    logger.info("✅ MongoDB Atlas connected successfully");
    await Transaction.syncIndexes(); // Sync indexes after connection
    logger.info("✅ Transaction indexes synced successfully");
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const User = require("./models/userModel");
const Account = require("./models/accountModel");
const Transaction = require("./models/transactionModel");
module.exports = {
  User,
  Account,
  Transaction,
};
