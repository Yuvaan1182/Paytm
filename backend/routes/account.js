const express = require("express");
const {
  getUserBalance,
  transferFunds,
  getTransactionHistory,
  addMoneyToWallet,
} = require("../utils/account/accountUtilityMethods");
// const transferLockMiddleware = require('../middlewares/transferLockMiddleware');

const router = express.Router();
router.get("/balance", getUserBalance);
router.get("/transaction", getTransactionHistory);
// router.post('/transfer', transferLockMiddleware, transferFunds);
router.post("/transfer", transferFunds);
router.post("/add", addMoneyToWallet);

module.exports = router;
