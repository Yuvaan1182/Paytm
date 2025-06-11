const express = require('express');
const router = express.Router();
const {getUserAnalyticsSummary} = require('../utils/transaction/analyticsUtilityMethods');

router.get('/summary', getUserAnalyticsSummary);

module.exports = router;
