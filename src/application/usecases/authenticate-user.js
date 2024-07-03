const bcrypt = require('bcrypt');
const UserEntity = require('../../domain/entities/user-entity');

function usecase(logger, repositories) {

    async function registerUser({ email, password }) {
        const existing = await repositories.user.getUserByEmail(email);
        if (!existing || !bcrypt.compareSync(password, existing.password)) {
            return new Error('Invalid username or password');
        }
        logger.info('user authenticated');
        return new UserEntity({ email: existing.email, name: existing.name, id: existing._id });
    }

    return registerUser;

}

module.exports = usecase;