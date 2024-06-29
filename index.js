require('dotenv').config();
const app = require('express')();

//setup framework
const configurations = require('./src/configurations/config');
const logger = require('./src/configurations/logger')(configurations);
const router = require('./src/routes')(logger);

//start server
app.use(router);

app.listen(configurations.port, () => {
    logger.info('Server is running on port ' + configurations.port);
});