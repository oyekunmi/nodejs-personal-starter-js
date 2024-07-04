const router = require('express').Router();

function routes(logger, controllers, middlewares) {

    router.get('/', middlewares.verifyAuthToken, (req, res) => {
        logger.info('Hello World');
        res.send('Hello World');
    });

    router.post('/user/register', middlewares.appendAuthToken, controllers.registerUser,);
    router.post('/user/login', middlewares.appendAuthToken, controllers.loginUser);

    return router;
}

module.exports = routes;

