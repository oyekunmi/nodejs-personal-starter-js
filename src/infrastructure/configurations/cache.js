const Redis = require('ioredis');
function setup(configurations, logger) {
    const redis = new Redis(configurations.cache);
    redis.on('connect', () => {
        logger.info('Connected to Redis');
    });
    redis.on('error', (err) => {
        logger.error('Error occurred while connecting to Redis...\n', err);
    });
    return redis;
}

module.exports = setup;