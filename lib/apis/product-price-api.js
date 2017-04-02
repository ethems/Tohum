const productPriceController = require('../../controllers/product-price-controller');
const validation = require('../../middlewares/validations/product-price-validation');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const productAuthentication = require('../../middlewares/product-authentication');



const productCategoryApi = (apiRouter) => {
  apiRouter.get('/productpriceunits', productPriceController.getProductPriceUnits);
  apiRouter.post('/products/:productID/productprices', jwtAuthentication, validation.postProductPrice, productAuthentication, productPriceController.postProductPrice);
};

module.exports = {
  default: productCategoryApi
};