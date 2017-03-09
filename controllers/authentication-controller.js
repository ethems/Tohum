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

const signup = async(req, res, next) => {
  const {email, password} = req.body;
  try {
    // See if a user with the given email exists
    const existingUser = await User.findOne({email}).exec();
    // If a user with email does exits, return an error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }
    const newUser = await User.create({email, password});
  } catch (err) {
    return next(err);
  }
};

const signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token
  try {
      token: tokenForUser(req.user)
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signup,
  signin
};
