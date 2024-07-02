const bcrypt = require('bcrypt');
const UserEntity = require('../../domain/entities/user-entity');

function usecase(logger, repositories, cache) {

    async function registerUser({ name, email, password }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserEntity({ name, email, password: hashedPassword });
        await repositories.user.createUser(user);
        logger.info('User registered');
    }

    return registerUser;

}

module.exports = usecase;