function controllers(logger, usecases) {
    const userController = require('./user')(logger, usecases);
    return {
        ...userController,
    };
}



module.exports = controllers;