const createError = require('http-errors');
const get_ip = require('ipware')().get_ip;
const Login = require('../models/login');

const getIdentityKey = (req) => {
  const {
    email
  } = req.body;
  const ipAddress = get_ip(req).clientIp;
  const identityKey = `${email.toLowerCase()}-${ipAddress}`;

  console.log(identityKey);
  return identityKey;
}

const middleware = async(req, res, next) => {
  const identityKey = getIdentityKey(req);
  try {
    if (await Login.inProgress(identityKey)) {
      setTimeout(() => {
        //throw createError(500, 'The account is temporarily locked out!');
        res.status(500).send('Login already in progress !');
      }, 3000);
    }

    if (!await Login.canAuthenticate(identityKey)) {
      // delay 3 sec
      setTimeout(() => {
        //throw createError(500, 'The account is temporarily locked out!');
        res.status(500).send('The account is temporarily locked out !');
      }, 3000);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  middleware,
  getIdentityKey
};