function usecases(configurations, logger, repositories) {

    return {
        registerUser: require('./register-user')(logger, repositories),
        authenticateUser: require('./authenticate-user')(logger, repositories)
    };
}

module.exports = usecases;