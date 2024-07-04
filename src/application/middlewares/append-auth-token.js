const jwt = require('jsonwebtoken');
const mung = require('express-mung');

function middleware(configurations, logger) {

    function appendAuthToken(body, req, res) {
        logger.info('Appending auth token');

        if (res.statusCode !== 200) {
            return body;
        }

        const token = jwt.sign(
            { email: body.email },
            configurations.jwt.secret,
            { expiresIn: configurations.jwt.expiresIn }
        );
        body.accessToken = token;
        res.setHeader('x-auth-token', token);
        return body;

    }

    return mung.json(appendAuthToken);
}

module.exports = middleware;
