const authenticationController = require('../../controllers/authentication-controller');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const localAuthentication = require('../../middlewares/local-authentication');
const validations = require('../../middlewares/validations/authentication-validation');

const baseApi = (apiRouter) => {
  apiRouter.post('/signup', validations.signup, authenticationController.signup);
  apiRouter.post('/signin', authenticationController.signin);
};

module.exports = {
  default: baseApi
};
