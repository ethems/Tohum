const authenticationController = require('../../controllers/authentication-controller');
const localAuthentication = require('../../middlewares/local-authentication');
const validation = require('../../middlewares/validations/authentication-validation');

const baseApi = (apiRouter) => {
  apiRouter.post('/signup', validation.signup, authenticationController.signup);
  apiRouter.post('/signin', validation.signin, localAuthentication, authenticationController.signin);
};

module.exports = {
  default: baseApi
};
