const authenticationController = require('../../controllers/authentication-controller');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const localAuthentication = require('../../middlewares/local-authentication');

const baseApi = (apiRouter) => {
  apiRouter.post('/signup', authenticationController.signup);
  apiRouter.post('/signin', authenticationController.signin);
};

module.exports = {
  default: baseApi
};
