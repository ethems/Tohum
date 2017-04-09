const _ = require('lodash');
const Product = require('../models/product');
const User = require('../models/user');
const createError = require('http-errors');


const getUser = async(req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const foundUser = await User.safeFindById(id).exec();
    if (foundUser) {
      return res.json(foundUser);
    }
    throw createError(400, `There is no user with ${id}`);
  } catch (err) {
    return next(err);
  }
};

const getProductsByUser = async(req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const products = await Product.find({
      ownerID: id
    }).exec();
    res.json(products);
  } catch (err) {
    return next(err);
  }
};

const putUser = async(req, res, next) => {
  const {
    id
  } = req.params;
  const {
    user
  } = req;
  const requestBody = _.pick(req.body, ['email', 'name', 'addresses', 'password']);
  try {
    // Check id and id of requester
    // if not return unauthorized response 
    // For MongoDB ID  use equals !!!!
    if (user._id.equals(id)) {
      // Update User
      const updatingUser = await User.findById(id).exec();
      // update methods
      updatingUser.updateEmail(requestBody.email);
      updatingUser.updatePassword(requestBody.password);
      updatingUser.updateName(requestBody.name);
      updatingUser.updateAddresses(requestBody.addresses);
      // save !
      await updatingUser.save();
      // return refresh user
      const updatedUser = await User.safeFindById(id).exec();
      if (updatedUser) {
        return res.json(updatedUser);
      }
      throw createError(400, `User update error ${requestBody}`);
    } else {
      throw createError(401, `There is no authrozation to change user  ${id}`);
    }
  } catch (err) {
    return next(err);
  }
};



module.exports = {
  getUser,
  getProductsByUser,
  putUser
};
