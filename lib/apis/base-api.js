const authenticationController = require('../../controller/authentication-controller.js');

const baseApi = (apiRouter) => {
  apiRouter.post('/signup', authenticationController.signup);
};

module.exports = {
  default: baseApi
};
