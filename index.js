require('dotenv').config();
const express = require('express');
const app = express();

bootstrap().then(({ configurations, logger }) => {
    startServer(configurations, logger);
});

async function bootstrap() {
    //setup custom framework that makes testing easier with concept of Dependency Injection
    const configurations = require('./src/infrastructure/configurations/config');
    const logger = require('./src/infrastructure/configurations/logger')(configurations);
    const db = await require('./src/infrastructure/configurations/database')(configurations, logger);
    const cache = await require('./src/infrastructure/configurations/cache')(configurations, logger);
    const controllers = require('./src/presentation/controllers')(logger);
    // const useCases = require('./src/domain/use-cases')(logger, db, cache);

    const router = require('./src/presentation/routes')(logger, controllers);

    app.use(express.json()); 
    app.use(router); 

    return {
        configurations,
        logger
    }
}

function startServer(configurations, logger) {
    app.listen(configurations.port, () => {
        logger.info('Server is running on port ' + configurations.port);
    });
}