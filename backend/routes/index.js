const express = require('express');

const userRouter = require('./user');
const accountRouter = require('./account');
const authRouter = require('./auth'); // Added auth router
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/auth', authRouter); // Updated auth route to use Passport.js

module.exports = router;