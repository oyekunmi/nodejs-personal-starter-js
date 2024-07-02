

function usecases(logger, db, cache) {


    return {
        registerUser: require('./register-user')(logger, db, cache),
    };
}


module.exports = usecases;