const { getAsync, setAsync, delAsync } = require('../utils/redisClient');
const logger = require('../utils/logger'); // Import logger

const transferLockMiddleware = async (req, res, next) => {
    const userId = req.user.id; // Assuming `authMiddleWare` attaches `user` to `req`
    const lockKey = `transfer_lock_${userId}`;

    try {
        const isLocked = await getAsync(lockKey);
        if (isLocked) {
            return res.status(429).json({ message: 'Transaction in progress. Please wait.' });
        }

        await setAsync(lockKey, '1', 'EX', 60); // Set lock with a 60-second expiration
        res.on('finish', async () => {
            await delAsync(lockKey); // Remove lock after response finishes
        });

        next();
    } catch (err) {
        logger.error('Redis error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = transferLockMiddleware;
