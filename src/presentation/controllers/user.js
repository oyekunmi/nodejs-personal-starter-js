const bcrypt = require('bcrypt');
const User = require('../../domain/entities/user');


function controllers(logger) {

    async function registerUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            logger.info('User registered');
            res.send('User registered');
        } catch (error) {
            next(error);
        }
    }

    return {
        registerUser
    };
}

module.exports = controllers;