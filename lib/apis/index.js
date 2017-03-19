const productApi = require('./product-api');
const baseApi = require('./authentication-api');
const productCategoryApi = require('./product-category-api');

module.exports = (apiRouter) => {
  baseApi.default(apiRouter);
  productApi.default(apiRouter);
  productCategoryApi.default(apiRouter);
};
