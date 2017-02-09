const express = require('express');
const config = require('./config');
const logger = require('./lib/logger');

const app = express();

// DB SETUP
require('./lib/db');

// APP ROUTER
app.use(express.static('public'));
app.use(config.get('app:siteRoot'), require('./lib/app-router'));

const server = app.listen(config.get('PORT'), (error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info(`===> Listening on port ${config.get('PORT')} in ${config.get('NODE_ENV')} mode`);
  }
});

module.exports = server;
