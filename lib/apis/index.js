const productApi = require('./product-api');
const baseApi = require('./authentication-api.js');

module.exports = (apiRouter) => {
  baseApi.default(apiRouter);
  productApi.default(apiRouter);
};
