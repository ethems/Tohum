const productController = require('../../controllers/product-controller');
const validation = require('../../middlewares/validations/product-validation');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const productAuthentication = require('../../middlewares/product-authentication');



const productApi = (apiRouter) => {
  apiRouter.get('/products/:id', validation.getProduct, productController.getProduct);
  apiRouter.post('/products', jwtAuthentication, validation.postProduct, productController.postProduct);
  apiRouter.put('/products/:id', jwtAuthentication, validation.putProduct, productAuthentication, productController.putProduct);
  apiRouter.delete('/products/:id', jwtAuthentication, validation.deleteProduct, productAuthentication, productController.deleteProduct);
};

module.exports = {
  default: productApi
};