const Product = require('../models/product');

const getProduct = async(req, res, next) => {
  const {
    id
  } = req.query;
  try {
    const foundProduct = await Product.findById(id).exec();
    if (foundProduct) {
      return res.json(foundProduct);
    }
    throw new Error(`There is no product with ${id}`);
  } catch (err) {
    return next(err);
  }
};

const postProduct = async(req, res, next) => {
  const creatingProduct = req.body;
  try {
    const createdProduct = await Product.create(creatingProduct);
    if (createdProduct) {
      return res.json(createdProduct);
    }
    throw new Error(`Product creation error ${creatingProduct}`);
  } catch (err) {
    return next(err);
  }
};

const putProduct = async(req, res, next) => {
  const {
    id
  } = req.query;
  const updatingProduct = req.body;
  const updateOptions = {
    new: true
  };
  try {
    const updatedProduct = await Product.findOneAndUpdate({
      _id: id
    }, updatingProduct, updateOptions);
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    throw new Error(`Product update error ${updatingProduct}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProduct,
  postProduct,
  putProduct
};
