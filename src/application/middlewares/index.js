function middlewares(configurations, logger) {
    return {
        errorHandler: require('./exception-handler')(logger),
        verifyAuthToken: require('./verify-auth-token')(configurations, logger),
        appendAuthToken: require('./append-auth-token')(configurations, logger)
    };
}

module.exports = middlewares;