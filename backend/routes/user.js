const express = require('express');

const { authMiddleWare } = require('../middlewares/authMiddleware');
const { getUserData, getUsers, updateUser } = require('../utils/user/userUtilityMethods');

const router = express.Router();

router.use(authMiddleWare);
router.get('/bulk', getUsers);
router.get('/', getUserData);
// router.put('/', authMiddleWare, updateUser);

module.exports = router;