const productApi = require('./product-api');
const baseApi = require('./authentication-api');
const productCategoryApi = require('./product-category-api');
const userApi = require('./user-api');
const productPriceApi = require('./product-price-api');

module.exports = (apiRouter) => {
  baseApi.default(apiRouter);
  productApi.default(apiRouter);
  productCategoryApi.default(apiRouter);
  userApi.default(apiRouter);
  productPriceApi.default(apiRouter);
};
