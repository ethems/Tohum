const winston = require('winston');
const RotateDailyFile = require('winston-daily-rotate-file');
const fs = require('fs');
const config = require('../config');

const logDir = config.get('log:directory') || 'log';
const logLevel = config.get('log:level') || 'debug';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new winston.Logger({
  transports: [ // colorize the output to the console
    new winston.transports.Console({level: 'debug', handleExceptions: true, timestamp: tsFormat, humanReadableUnhandledException: true, colorize: true}),
    new RotateDailyFile({
      filename: `${logDir}/-results.log`,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      timestamp: tsFormat,
      level: `${logLevel}`,
      datePattern: 'yyyy-MM-dd',
      prepend: true
    })
  ]
});

module.exports = logger;
