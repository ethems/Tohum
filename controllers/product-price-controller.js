const _ = require('lodash');
const createError = require('http-errors');
const Product = require('../models/product');
const ProductPrice = require('../models/product-price');
const ProductPriceUnits = require('../models/subdocuments/product-price-units');



const getProductPriceUnits = (req, res, next) => {
  return res.json(ProductPriceUnits);
};

const postProductPrice = async(req, res, next) => {
  const {
    productID
  } = req.params;
  try {
    const requestBody = _.pick(req.body, ['price', 'unit']);
    const creatingProductPrice = Object.assign({}, requestBody, {
      productID
    });
    await ProductPrice.expirePrice(productID).exec();
    const createdProductPrice = await ProductPrice.create(creatingProductPrice);
    if (createdProductPrice) {
      return res.json(createdProductPrice);
    }
    throw createError(400, `ProductPrice creation error ${creatingProductPrice}`);
  } catch (err) {
    return next(err);
  }
};


module.exports = {
  getProductPriceUnits,
  postProductPrice
};