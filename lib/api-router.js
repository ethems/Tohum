const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const bindApiIndex = require('./apis');

const apiRouter = express.Router();

// BODY PARSER
apiRouter.use(bodyParser.urlencoded({extended: true}));
apiRouter.use(expressValidator());
apiRouter.use(bodyParser.json());

// BIND ALL API CONTROLLERS
bindApiIndex(apiRouter);

// WHATEVER ROUTES DON'T MATCH THROW 404
apiRouter.use('/*', (req, res, next) => {
  const error = new Error('Resource not found');
  error.status = error.statusCode = 404;
  return next(error);
});

module.exports = apiRouter;
