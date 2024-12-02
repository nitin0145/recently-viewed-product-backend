const logger = require('../utils/logger');

function requestLogger(req, res, next) {
    logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(req.body)}`);
    next();
}

module.exports = requestLogger;
