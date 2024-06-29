require('dotenv').config();
const app = require('express')();

bootstrap().then(({ configurations, logger }) => {
    startServer(configurations, logger);
});

async function bootstrap() {
    //setup custom framework that makes testing easier with concept of Dependency Injection
    const configurations = require('./src/configurations/config');
    const logger = require('./src/configurations/logger')(configurations);
    const router = require('./src/routes')(logger);
    const db = await require('./src/configurations/database')(configurations, logger);

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
