const express = require('express');
const { authMiddleWare } = require('../middlewares/auth');
const { getUserBalance, transferFunds, getTransactionHistory } = require('../utils/account/accountUtilityMethods');
// const transferLockMiddleware = require('../middlewares/transferLockMiddleware');

const router = express.Router();

router.get('/balance', authMiddleWare, getUserBalance);
router.get('/transaction', authMiddleWare, getTransactionHistory);
// router.post('/transfer', authMiddleWare, transferLockMiddleware, transferFunds);
router.post('/transfer', authMiddleWare, transferFunds);


module.exports = router;