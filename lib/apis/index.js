const productApi = require('./product-api');
const baseApi = require('./base-api.js');

module.exports = (apiRouter) => {
  baseApi.default(apiRouter);
  productApi.default(apiRouter);
};
