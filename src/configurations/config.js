
const configurations = {
    port: process.env.APP_PORT || 4000,
    logger: {
        level: process.env.LOGGER_LEVEL || 'info'
    },
    db: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME
    }
};

module.exports = configurations; 