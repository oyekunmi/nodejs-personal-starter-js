function repository(logger, db) {
    async function createUser({ name, email, password }) {
        // const user = await db.User.create({ name, email, password });
        logger.info('User created in database');
        return { name, email };
    }

    async function getUserByEmail(email) {
        const user = await db.User.findOne({ where: { email } });
        return user;
    }

    return {
        createUser,
        getUserByEmail
    }
}

module.exports = repository;