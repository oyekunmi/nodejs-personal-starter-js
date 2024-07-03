const { MongoClient } = require('mongodb');

async function setup(configurations, logger) {
    const url = configurations.db.url;
    const dbName = configurations.db.name;

    try {
        const db = await MongoClient.connect(url);
        const dbo = db.db(dbName);
        logger.info('Connected to MongoDB');
        return dbo;
    } catch (err) {
        logger.error('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
}

module.exports = setup;