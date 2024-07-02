function controllers(logger) {
    const userController = require('./user')(logger);
    return {
        ...userController,
    };
}



module.exports = controllers;