const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

const User = require('./models/userModel');
const Account = require('./models/accountModel');

module.exports = {
        User,
        Account
};