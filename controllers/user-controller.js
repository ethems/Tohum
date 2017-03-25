const _ = require('lodash');
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

const putUser = async(req, res, next) => {
  const {
    id
  } = req.params;
  const {
    user
  } = req;
  const opts = {
    new: true,
    upsert: false
  };
  const updatingUser = _.pick(req.body, ['email', 'name', 'addresses', 'password']);
  try {
    if (user._id === id) {
      const updatedUser = await User.findOneAndUpdate({
        _id: id
      }, updatingUser, opts);
      if (updatedUser) {
        return res.json(updatedUser);
      }
      throw createError(400, `User update error ${updatingUser}`);
    } else {
      throw createError(401, `There is no authrozation to change user  ${id}`);
    }
  } catch (err) {
    return next(err);
  }
};



module.exports = {
  getUser,
  putUser
};