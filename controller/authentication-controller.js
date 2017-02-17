const co = require('co');
const User = require('../models/user');

const signup = (req, res, next) => {
  req.checkBody('email').notEmpty().isEmail();
  req.checkBody('password').notEmpty();
  co(function * () {
    const errors = yield req.getValidationResult();
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()});
    }
    const {email, password} = req.body;
    try {
      // See if a user with the given email exists
      const existingUser = yield User.findOne({email}).exec();
      // If a user with email does exits, return an error
      if (existingUser) {
        return res.status(422).send({error: 'Email is in use'});
      }
      const newUser = yield User.create({email, password});
      res.json(newUser);
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = {
  signup
};
