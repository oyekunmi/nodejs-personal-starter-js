
const configurations = {
    port: process.env.APP_PORT || 4000,
    logger: {
        level: process.env.LOGGER_LEVEL || 'info'
    }
};

module.exports = configurations; 