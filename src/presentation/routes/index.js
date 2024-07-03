const router = require('express').Router();

function setup(logger, controllers) {

    router.get('/', (req, res) => {
        logger.info('Hello World');
        res.send('Hello World');
    });

    router.post('/user/register', controllers.registerUser);
    router.post('/user/login', controllers.loginUser);

    return router;
}

module.exports = setup;

