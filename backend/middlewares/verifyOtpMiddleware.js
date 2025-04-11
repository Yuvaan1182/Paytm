const { getAsync, delAsync } = require('../utils/redisClient');
const logger = require('../utils/logger'); // Import logger

const verifyOtpMiddleware = async (req, res, next) => {
    const userId = req.user?.id; // Safely access user ID
    const otpKey = `transfer_otp_${userId}`;
    const { otp } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required for OTP verification.' });
    }

    if (!otp) {
        return res.status(400).json({ message: 'OTP is required for verification.' });
    }

    try {
        const storedOtp = await getAsync(otpKey);
        if (!storedOtp) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

        await delAsync(otpKey); // Delete OTP after successful verification
        next();
    } catch (err) {
        logger.error('Error in verifyOtpMiddleware:', err);
        return res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

module.exports = verifyOtpMiddleware;
