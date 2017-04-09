const authenticationController = require('../../controllers/authentication-controller');
const localAuthentication = require('../../middlewares/local-authentication');
const validation = require('../../middlewares/validations/authentication-validation');
const signinSecurity = require('../../middlewares/signin-security');

const baseApi = (apiRouter) => {
  apiRouter.post('/signup', validation.signup, authenticationController.signup);
  apiRouter.post('/signin', validation.signin, signinSecurity.middleware, localAuthentication, authenticationController.signin);
};

module.exports = {
  default: baseApi
};
