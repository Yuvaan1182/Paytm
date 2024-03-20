const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        balance: {
                type: Number,
                min: 0,
                required: true,
                default: 0
        }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account