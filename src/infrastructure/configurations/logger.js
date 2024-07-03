const winston = require('winston');
const { combine, timestamp, json, colorize, simple } = winston.format;

function logger(configuration) {

    return winston.createLogger({
        level: configuration.logger.level,
        format: combine(timestamp(), colorize(), json()),
        defaultMeta: { service: 'treasure-hunt' },
        transports: [new winston.transports.Console({ format: simple() }),],
    });

}

module.exports = logger;