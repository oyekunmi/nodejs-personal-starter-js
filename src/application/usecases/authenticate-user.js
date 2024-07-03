const bcrypt = require('bcrypt');
const UserEntity = require('../../domain/entities/user-entity');

function usecase(logger, repositories) {

    async function registerUser({ email, password }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserEntity({ name, email, password: hashedPassword });
        const insertedUser = await repositories.user.createUser(user);
        logger.info('user authenticated');
        return insertedUser;
    }

    return registerUser;

}

module.exports = usecase;