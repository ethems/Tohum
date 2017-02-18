const authenticationController = require('../../controllers/authentication-controller.js');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const localAuthentication = require('../../middlewares/local-authentication');


const baseApi = (apiRouter) => {
  apiRouter.post('/signup', authenticationController.signup);
};

module.exports = {
  default: baseApi
};
