const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Atlas connected successfully");
    await Transaction.syncIndexes(); // Sync indexes after connection
    console.log("✅ Transaction indexes synced successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
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
