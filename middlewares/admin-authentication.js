const createError = require('http-errors');

module.exports = function(req, res, next) {
  const {
    admin
  } = req.user;
  if (admin) {
    return next();
  } else {
    return next(createError(401, 'User is not admin'));
  }
};