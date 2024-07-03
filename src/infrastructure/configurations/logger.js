const winston = require('winston');

function logger(configuration) {

    return winston.createLogger({
        level: configuration.logger.level,
        format: winston.format.timestamp(),
        defaultMeta: { service: 'treasure-hunt' },
        transports: [
            //console
            new winston.transports.Console({ format: winston.format.simple() }),
        //     //
        //     // - Write all logs with importance level of `error` or less to `error.log`
        //     // - Write all logs with importance level of `info` or less to `combined.log`
        //     //
        //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //     new winston.transports.File({ filename: 'combined.log' }),
        ],
    });

}

module.exports = logger;