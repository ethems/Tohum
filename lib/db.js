const mongoose = require('mongoose');
const logger = require('./logger');
const bluebird = require('bluebird');
const config = require('../config');

mongoose.Promise = bluebird;
mongoose.connect(config.get('connectionString'));

mongoose.connection.on('connected', () => {
  logger.info('Mongoose connection open');
});

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB Error: ', error);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose disconnected through app terminal');
    process.exit(0);
  });
});
