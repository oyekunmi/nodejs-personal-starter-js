const router = require('express').Router();

function setup(logger) {

    router.get('/', (req, res) => {
        logger.info('Hello World');
        res.send('Hello World');
    });

    return router;
}

module.exports = setup;