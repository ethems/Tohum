const _ = require('lodash');
const Product = require('../models/product');
const createError = require('http-errors');


const getProduct = async(req, res, next) => {
  const {
    id
  } = req.params;
  try {
    // TODO !!!!!
    // ADD Active Price
    // !!!!
    const foundProduct = await Product.findById(id).populate('category').populate('owner').exec();
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
    product
  } = req;
  const {
    id
  } = req.params;
  const opts = {
    new: true,
    upsert: false
  };
  try {
    product.setIsDeleted();
    const deletedProduct = await product.save();
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
  const requestBody = _.pick(req.body, ['name', 'active', 'categoryID', 'address']);
  const creatingProduct = Object.assign({}, requestBody, {
    ownerID: user._id
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
    product
  } = req;
  const requestBody = _.pick(req.body, ['name', 'active', 'categoryID', 'address']);
  try {
    // Owner is importnat because another user might update anothers' products
    product.updateName(requestBody.name);
    product.updateActive(requestBody.active);
    product.updateCategory(requestBody.category);
    product.updateAddress(requestBody.address);
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.json(updatedProduct);
    }
    throw createError(400, `Product update error ${product}`);
  } catch (err) {
    return next(err);
  }
};



module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
};