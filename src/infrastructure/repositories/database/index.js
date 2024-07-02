function repositories(logger, database) {
    return {
        user: require('./user-repository')(logger, database),
        // other repositories
    }
}

module.exports = repositories;