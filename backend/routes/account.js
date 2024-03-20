const express = require('express');
const { authMiddleWare } = require('../middlewares/auth');
const { getUserBalance, transferFunds } = require('../utils/account/accountUtilityMethods');

const router = express.Router();

router.get('/balance', authMiddleWare, getUserBalance);
router.post('/transfer', authMiddleWare, transferFunds)

module.exports = router;