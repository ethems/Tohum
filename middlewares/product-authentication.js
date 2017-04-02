const createError = require('http-errors');
const Product = require('../models/product');



module.exports = async(req, res, next) => {
  const {
    user
  } = req;
  const productID = req.params.productID || req.params.id;
  try {
    const product = await Product.findById(productID).exec();
    if (product) {
      if (product.ownerID.equals(user._id)) {
        req.product = product;
        return next();
      } else {
        throw createError(403, 'Forbidden Product');
      }
    } else {
      throw createError(400, `There is no product with id ${productID}`);
    }
  } catch (err) {
    next(err);
  }
};


