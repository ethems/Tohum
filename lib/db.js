const mongoose = require('mongoose');
const logger = require('./logger');
const bluebird = require('bluebird');

module.exports = (config) => {
  mongoose.Promise = bluebird;
  mongoose.connect(config.dbUri);
  mongoose.connection.on('error', (error) => {
    logger.error('MongoDB Error: ', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose disconnected through app terminal');
      process.exit(0);
    });
  });

  return mongoose;
}
