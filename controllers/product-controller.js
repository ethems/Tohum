const _ = require('lodash');
const Product = require('../models/product');
const createError = require('http-errors');


const getProduct = async(req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const foundProduct = await Product.findById(id).exec();
    if (foundProduct) {
      return res.json(foundProduct);
    }
    throw createError(400, `There is no product with ${id}`);
  } catch (err) {
    return next(err);
  }
};

const deleteProduct = async(req, res, next) => {
  // soft-delete
  const {
    user
  } = req;
  const {
    id
  } = req.params;
  const opts = {
    new: true,
    upsert: false
  };
  try {
    const deletedProduct = await Product.findOneAndUpdate({
      _id: id,
      owner: user._id
    }, {
      $set: {
        isDeleted: true
      }
    }, opts).exec();
    if (deletedProduct) {
      return res.sendStatus(202);
    } else {
      throw createError(400, `There is no product with ${id}`);
    }
  } catch (err) {
    return next(err);
  }
};

const postProduct = async(req, res, next) => {
  const {
    user
  } = req;
  const requestBody = _.pick(req.body, ['name', 'active', 'category', 'address']);
  const creatingProduct = Object.assign({}, requestBody, {
    owner: user._id
  });
  try {
    const createdProduct = await Product.create(creatingProduct);
    if (createdProduct) {
      return res.json(createdProduct);
    }
    throw createError(400, `Product creation error ${creatingProduct}`);
  } catch (err) {
    return next(err);
  }
};

const putProduct = async(req, res, next) => {
  const {
    id
  } = req.params;
  const {
    user
  } = req;
  const requestBody = _.pick(req.body, ['name', 'active', 'category', 'address']);
  const updatingProduct = requestBody;
  const opts = {
    new: true,
    upsert: false
  };
  try {
    // Owner is importnat because another user might update anothers' products  
    const updatedProduct = await Product.findOneAndUpdate({
      _id: id,
      owner: user._id
    }, updatingProduct, opts);
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    throw createError(400, `Product update error ${updatingProduct}`);
  } catch (err) {
    return next(err);
  }
};

const patchProduct = async(req, res, next) => {
  // PATCH and PUT are same functions , in the future they might be changed.
  const {
    id
  } = req.params;
  const {
    user
  } = req;
  const requestBody = _.pick(req.body, ['name', 'active', 'category', 'address']);
  const updatingProduct = requestBody;
  const updateOptions = {
    new: true,
    upsert: false
  };
  try {
    // Owner is important  because another user might update anothers' products  
    const updatedProduct = await Product.findOneAndUpdate({
      _id: id,
      owner: user._id
    }, updatingProduct, updateOptions);
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    throw createError(400, `Product update error ${updatingProduct}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct
};
