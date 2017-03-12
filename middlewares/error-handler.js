const logger = require('../lib/logger');

module.exports = function (err, req, res, next) {
  logger.error(err);
  res.status(err.statusCode || 500).json(err);
};
