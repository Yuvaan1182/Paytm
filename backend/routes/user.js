const express = require('express');

const { getUserData, getUsers, updateUser } = require('../utils/user/userUtilityMethods');

const router = express.Router();

router.get('/bulk', getUsers);
router.get('/', getUserData);
// router.put('/', authMiddleWare, updateUser);

module.exports = router;
