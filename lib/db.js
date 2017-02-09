const mongoose = require('mongoose');
const logger = require('./logger');
const bluebird = require('bluebird');
const config = require('../config');

if (config.get('NODE_ENV') !== 'test') {
  const credential = (config.get('db:username') && config.get('db:password'))
    ? `${config.get('db:username')}:${config.get('db:password')}@`
    : '';
  const connectionString = `mongodb://${credential}${config.get('db:host')}:${config.get('db:port')}/${config.get('db:database')}`;

  mongoose.Promise = bluebird;
  mongoose.connect(connectionString);
  mongoose.connection.on('error', (error) => {
    logger.error('MongoDB Error: ', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose disconnected through app terminal');
      process.exit(0);
    });
  });
}

module.exports = mongoose;
