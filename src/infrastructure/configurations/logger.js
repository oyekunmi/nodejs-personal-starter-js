const winston = require('winston');
const { combine, timestamp, json, colorize, simple } = winston.format;

function logger(configuration) {

    return winston.createLogger({
        level: configuration.logger.level,
        format: combine(timestamp(), colorize(), json()),
        defaultMeta: { service: 'treasure-hunt' },
        transports: [
            //console
            new winston.transports.Console({ format: simple() }),
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