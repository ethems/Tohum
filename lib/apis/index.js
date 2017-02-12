const productApi = require('./product-api');

module.exports = (apiRouter) => {
  productApi.default(apiRouter);
};
