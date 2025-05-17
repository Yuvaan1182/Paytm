const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: [
                    'food',
                    'grocery',
                    'electricity',
                    'rent',
                    'recharge',
                    'credit_card',
                    'travel',
                    'health',
                    'subscription',
                    'shopping',
                    'bills',
                    'education',
                    'transfer',
                    'bank',
                    'salary',
                    'utilities'
                ],
            required: false
        },
        amount: {
            type: Number,
            required: true,
        },
        transactionType: {
            type: String,
            enum: ['credit', 'debit'],
            required: true,
        },
        statusHistory: [
            {
              status: { type: String, enum: ['pending', 'failed', 'completed'], required: true },
              timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// ✅ Create Indexes for Faster Queries
transactionSchema.index({ senderId: 1 }); // Queries related to sender
transactionSchema.index({ receiverId: 1 }); // Queries related to receiver
transactionSchema.index({ 'statusHistory.status': 1 }); // Queries by status
transactionSchema.index({ createdAt: -1 }); // Sorting by latest transactions
transactionSchema.index({ category: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
