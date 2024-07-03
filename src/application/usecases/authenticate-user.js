const bcrypt = require('bcrypt');

function usecase(logger, repositories) {

    async function authenticateUser({ email, password }) {
        let existing = await repositories.user.getUserByEmail(email);
        if (!existing || !bcrypt.compareSync(password, existing.password)) {
            return new Error('Invalid username or password');
        }
        logger.info('user authenticated');
        existing.password = undefined;
        return existing;
    }

    return authenticateUser;

}

module.exports = usecase;