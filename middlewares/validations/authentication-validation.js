const co = require('co');

exports.signup = function(req, res, next) {
  req.checkBody('email').notEmpty().isEmail();
  req.checkBody('password').notEmpty();
  co(function * () {
    const errors = yield req.getValidationResult();
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()});
    }
    next();
  });
}
