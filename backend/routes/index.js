const express = require('express');

const userRouter = require('./user');
const accountRouter = require('./account');
const authRouter = require('./auth');
const analyticsRouter = require('./analytics');
const { authMiddleWare } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use('/auth', authRouter);
router.use(authMiddleWare);
router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/analytics', analyticsRouter);

module.exports = router;
