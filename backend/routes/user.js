const express = require('express');

const { authMiddleWare } = require('../middlewares/auth');
const { userSignup, userSignin, getUsers, updateUser } = require('../utils/user/userUtilityMethods');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/signin', userSignin);
router.use(authMiddleWare);
router.get('/bulk', getUsers);
router.put('/', authMiddleWare, updateUser);

module.exports = router;