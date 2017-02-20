const mongoose = require('mongoose');
const logger = require('./logger');
const bluebird = require('bluebird');
const config = require('../config');

module.exports = () => {
  const dbOptions = {
    user: config.get('db:username') || '',
    pass: config.get('db:password') || ''
  };

  const connectionString = `mongodb://${config.get('db:host')}:${config.get('db:port')}/${config.get('db:database')}`;

  mongoose.Promise = bluebird;
  mongoose.connect(connectionString,dbOptions);

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
};
