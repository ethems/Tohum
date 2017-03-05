const co = require('co');
const jwt = require('jwt-simple');
const User = require('../models/user');

const config = require('../config');

const tokenForUser = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timeStamp
  }, config.get('app:secret'));
};

const signup = (req, res, next) => {
  co(function * () {
    const {email, password} = req.body;
    try {
      // See if a user with the given email exists
      const existingUser = yield User.findOne({email}).exec();
      // If a user with email does exits, return an error
      if (existingUser) {
        return res.status(422).send({error: 'Email is in use'});
      }
      const newUser = yield User.create({email, password});
      res.json({token: tokenForUser(newUser)});
    } catch (err) {
      return next(err);
    }
  });
};

const signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token
  return res.send({
    token: tokenForUser(req.user)
  });
};

module.exports = {
  signup,
  signin
};
