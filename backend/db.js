const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI, { tls: true });

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      tls: true, // Force TLS
    });
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const User = require("./models/userModel");
const Account = require("./models/accountModel");

module.exports = {
  User,
  Account,
};
