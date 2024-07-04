const jwt = require('jsonwebtoken');

function middleware(configurations, logger) {

    function verifyAuthToken(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                status: 'fail',
                message: 'Unauthorized!',
            });
        }
        const token = authHeader.split(' ')[1];
        try {
            const user = jwt.verify(token, configurations.jwt.secret);
            req.user = user;
            next();
        } catch (error) {
            logger.error(error);
            res.status(401).json({
                status: 'fail',
                message: 'Unauthorized!',
            });
        }
    }

    return verifyAuthToken;
}

module.exports = middleware;