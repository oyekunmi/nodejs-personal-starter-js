
const configurations = {
    port: process.env.APP_PORT || 4000,
    logger: {
        level: process.env.LOGGER_LEVEL || 'info'
    },
    db: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME
    },
    cache: {
        port: process.env.CACHE_PORT || 6379,
        host: process.env.CACHE_HOST || 'localhost',
        password: process.env.CACHE_PASSWORD,
        username: process.env.CACHE_USERNAME,
        db: process.env.CACHE_DB || 0
    }
};

module.exports = configurations; 