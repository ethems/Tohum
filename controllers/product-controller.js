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
    const error = new Error(`There is no product with ${id}`);
    error.statusCode = 400;
    throw error;
  } catch (err) {
    return next(err);
  }
};

const postProduct = async(req, res, next) => {
  const {
    user
  } = req;
  const creatingProduct = Object.assign({}, req.body, {
    owner: user._id
  });
  try {
    const createdProduct = await Product.create(creatingProduct);
    if (createdProduct) {
      return res.json(createdProduct);
    }
    const error = new Error(`Product creation error ${creatingProduct}`);
    error.statusCode = 400;
    throw error;
  } catch (err) {
    return next(err);
  }
};

const putProduct = async(req, res, next) => {
  const {
    id
  } = req.query;
  const {
    user
  } = req;
  const updatingProduct = req.body;
  const updateOptions = {
    new: true,
    upsert: false
  };
  try {
    const updatedProduct = await Product.findOneAndUpdate({
      _id: id,
      owner: user._id
    }, updatingProduct, updateOptions);
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    const error = new Error(`Product update error ${updatingProduct}`);
    error.statusCode = 400;
    throw error;
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProduct,
  postProduct,
  putProduct
};