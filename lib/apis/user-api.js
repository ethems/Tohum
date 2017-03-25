const userController = require('../../controllers/user-controller');
const validation = require('../../middlewares/validations/user-validation');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const adminAuthentication = require('../../middlewares/admin-authentication');


const userApi = (apiRouter) => {
  apiRouter.get('/users/:id', validation.getUser, userController.getUser);
  apiRouter.put('/users/:id', jwtAuthentication, validation.putUser, userController.putUser);
};

module.exports = {
  default: userApi
};
