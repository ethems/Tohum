const productController = require('../../controller/product-controller');

module.exports = (apiRouter) => {
  productController.default(apiRouter);
};
