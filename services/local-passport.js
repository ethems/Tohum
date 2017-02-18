const LocalStrategy = require('passport-local');
const co = require('co');
const User = require('../models/user');
const config = require('../config');

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, passport, done) {
  // Vefify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise , call done with false
  co(function * () {
    try {
      const existingUser = yield User.findOne({email}).exec();
      if (existingUser) {
        //return done(null, existingUser);
        existingUser.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            return done(null, false);
          }
          return (null, existingUser);
        });
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }

  });
});

module.exports = localLogin;
