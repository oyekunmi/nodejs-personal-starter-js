const express = require('express');
const logger = require('./src/configurations/logger');

const app = express();

app.get('/', (req, res) => {
    logger.info('Hello World');
    res.send('Hello World');
});

app.listen(3000, () => {
    logger.info('Server is running on port 3000');
});



