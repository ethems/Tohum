const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bindApiIndex = require('./apis');
const jwtLogin = require('../services/jwt-passport');
const localLogin = require('../services/local-passport');
const customValidators = require('./custom-validators');

const apiRouter = express.Router();

// BODY PARSER
apiRouter.use(bodyParser.urlencoded({
  extended: true
}));
apiRouter.use(expressValidator({
  customValidators
}));
apiRouter.use(bodyParser.json());
passport.use(jwtLogin);
passport.use(localLogin);
// BIND ALL API CONTROLLERS
bindApiIndex(apiRouter);

// WHATEVER ROUTES DON'T MATCH THROW 404
apiRouter.use('/*', (req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  error.statusCode = 404;
  return next(error);
});

module.exports = apiRouter;
