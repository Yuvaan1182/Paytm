const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        // Console transport for all logs
        new winston.transports.Console(),
        // Combined log file for all logs
        new winston.transports.File({ filename: 'logs/app.log' }),
        // Error log file for only error-level logs
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
});

module.exports = logger;
