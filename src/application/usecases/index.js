function usecases(logger, repositories, cache) {

    return {
        registerUser: require('./register-user')(logger, repositories, cache),
        authenticateUser: require('./authenticate-user')(logger, repositories, cache)
    };
}

module.exports = usecases;