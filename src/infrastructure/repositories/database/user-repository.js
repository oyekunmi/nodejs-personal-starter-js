const UserModel = require('./models/user-model');
const UserEntity = require('../../../domain/entities/user-entity');

function repository(logger, db) {
    const collection = 'users';
    async function createUser({ name, email, password }) {

        //@TODO: Should we introduce a data model for user?
        const userModel = new UserModel({ name, email, password });
        const insertedDoc = await db.collection(collection).insertOne(userModel);

        logger.info(`User created in database ${insertedDoc && insertedDoc.insertedId}`);

        return new UserEntity({ id: insertedDoc.insertedId, name, email });
    }

    async function getUserByEmail(email) {
        const user = await db.collection(collection).findOne({ email });
        if (!user) {
            return null;
        }
        return new UserEntity({ id: user._id.toString(), name: user.name, email: user.email, password: user.password });
    }

    return {
        createUser,
        getUserByEmail
    }
}

module.exports = repository;