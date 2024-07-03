function middleware(logger) {
    function errorHandler(err, req, res, next) {
        if (res.headersSent) {
            return next(err)
        }

       logger.error(err.stack);

       res.status(500).json({ error: 'Internal Server Error' });
    }

    return errorHandler;
}

module.exports = middleware;