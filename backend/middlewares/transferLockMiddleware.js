const { getAsync, setAsync } = require('../utils/redisClient');
const logger = require('../utils/logger'); // Import logger
const sendOtp = require('../utils/sendOtp'); // Utility to send OTP

// Constants for expiration times
const OTP_EXPIRATION_SECONDS = 300; // 5 minutes

const transferLockMiddleware = async (req, res, next) => {
    const userId = req.user?.id; // Safely access user ID
    const lockKey = `transfer_lock_${userId}`;
    const otpKey = `transfer_otp_${userId}`;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required for the transaction.' });
    }

    try {
        const isLocked = await getAsync(lockKey);
        if (isLocked) {
            return res.status(429).json({ message: 'Transaction in progress. Please wait.' });
        }

        // Generate and send OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        await setAsync(otpKey, otp, 'EX', OTP_EXPIRATION_SECONDS); // Store OTP with expiration
        sendOtp(req.user.phone, otp); // Send OTP to user's phone

        return res.status(200).json({ message: 'OTP sent. Please verify to proceed.' });
    } catch (err) {
        logger.error('Error in transferLockMiddleware:', err);
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

module.exports = { transferLockMiddleware };
