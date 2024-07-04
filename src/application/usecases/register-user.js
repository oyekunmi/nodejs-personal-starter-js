const bcrypt = require('bcrypt');
const UserEntity = require('../../domain/entities/user-entity');

function usecase(logger, repositories) {

    async function registerUser({ name, email, password }) {
        const existing = await repositories.user.getUserByEmail(email);
        if (existing) {
            return new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserEntity({ name, email, password: hashedPassword });
        const insertedUser = await repositories.user.createUser(user);
        insertedUser.password = undefined;
        logger.info('User registered');
        return insertedUser;
    }

    return registerUser;

}

module.exports = usecase;