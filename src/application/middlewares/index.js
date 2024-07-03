function middlewares(logger) {
    return {
        errorHandler: require('./exception-handler')(logger)
    };
}

module.exports = middlewares;