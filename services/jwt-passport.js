const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.get('app:secret')
};

// CreateJWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
  // See if the user ID in the payload exists in our DB
  // if it does, call done with that other
  // otherwise, call done without a user object
  try {
    const existingUser = await User.findById(payload.sub).exec();
    if (existingUser) {
      return done(null, existingUser);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = jwtLogin;
