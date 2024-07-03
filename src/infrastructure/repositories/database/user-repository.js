function repository(logger, db) {
    const collection = 'users';
    async function createUser({ name, email, password }) {

        //@TODO: Should we introduce a data model for user?
        const user = { name, email, password };
        const userDocument = await db.collection(collection).insertOne(user);

        logger.info(`User created in database ${userDocument && userDocument.insertedId}`);
        return { id: userDocument.insertedId, name, email };
    }

    async function getUserByEmail(email) {
        const user = await db.collection(collection).findOne({ email });
        //@TODO: Should we introduce a data model for user?
        return user;
    }

    return {
        createUser,
        getUserByEmail
    }
}

module.exports = repository;