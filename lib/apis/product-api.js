const productController = require('../../controllers/product-controller');
const validation = require('../../middlewares/validations/product-validation');
const jwtAuthentication = require('../../middlewares/jwt-authentication');



const productApi = (apiRouter) => {
  apiRouter.get('/products/:id', validation.getProduct, productController.getProduct);
  apiRouter.post('/products', validation.postProduct, jwtAuthentication, productController.postProduct);
  apiRouter.put('/products/:id', validation.putProduct, jwtAuthentication, productController.putProduct);
};

module.exports = {
  default: productApi
};
