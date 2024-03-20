const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user');

const User = require('./models/userModel');
const Account = require('./models/accountModel');

module.exports = {
        User,
        Account
};