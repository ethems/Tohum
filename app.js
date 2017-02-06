const express = require('express');
const logger = require('./lib/logger');
const appRouter = require('./lib/app-router');


const app = express();

// ENVIRONMENT
const environmentTypes = ['production', 'development', 'test'];
const envArg = process.argv && process.argv[process.argv.length - 1];
const env = environmentTypes.includes(envArg)
  ? envArg
  : 'development';
process.env.NODE_ENV = process.env.NODE_ENV || env;

// RUNTIME CONFIGIRATION
const config = require('./config')();

// DB SETUP
if (process.env.NODE_ENV !== 'test') {
  require('./lib/db')(config);
}


// STATIC FILES
app.use(express.static('public'));
// APP ROUTER
app.use(config.siteRoot, appRouter(config));


const server = app.listen(config.serverPort, (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`===> Listening on port ${config.serverPort} in ${process.env.NODE_ENV} mode`);
  }
});

module.exports = server;
