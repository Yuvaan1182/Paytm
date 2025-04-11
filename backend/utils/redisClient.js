const redis = require('redis');
const { promisify } = require('util');
const logger = require('./logger'); // Import centralized logger

// Configure Redis connection using environment variables
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
});

// Log connection success
redisClient.on('connect', () => {
    logger.info('Redis client connected successfully.');
});

// Log when the client is ready to use
redisClient.on('ready', () => {
    logger.info('Redis client is ready to use.');
});

// Log connection errors
redisClient.on('error', (err) => {
    logger.error(`Redis client error: ${err.message}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    redisClient.quit(() => {
        logger.info('Redis client disconnected on app termination.');
        process.exit(0);
    });
});

// Promisify Redis methods
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

// Wrapper functions with error handling
async function safeSetAsync(key, value) {
    try {
        await setAsync(key, value);
        logger.info(`Key "${key}" set successfully.`);
    } catch (err) {
        logger.error(`Error setting key "${key}" in Redis: ${err.message}`);
        throw err; // Re-throw the error for the caller to handle
    }
}

async function safeGetAsync(key) {
    try {
        const value = await getAsync(key);
        logger.info(`Retrieved value for key "${key}".`); // Avoid logging sensitive data
        return value;
    } catch (err) {
        logger.error(`Error getting key "${key}" from Redis: ${err.message}`);
        throw err; // Re-throw the error for the caller to handle
    }
}

async function safeDelAsync(key) {
    try {
        await delAsync(key);
        logger.info(`Key "${key}" deleted successfully.`);
    } catch (err) {
        logger.error(`Error deleting key "${key}" in Redis: ${err.message}`);
        throw err; // Re-throw the error for the caller to handle
    }
}

module.exports = {
    redisClient,
    setAsync: safeSetAsync,
    getAsync: safeGetAsync,
    delAsync: safeDelAsync,
};
