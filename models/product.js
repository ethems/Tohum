const mongoose = require('mongoose');
const moment = require('moment');
const stringUtil = require('../lib/utils/string-util');
const address = require('./subdocuments/address');
const createError = require('http-errors');


const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    set: stringUtil.capitalize,
    unique: true
  },
  active: {
    // Product might be active or inactive in its lifetime.
    // This property coordicates show or hide
    type: Boolean,
    default: true
  },
  isDeleted: {
    // Soft delete
    type: Boolean,
    default: false
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  address: {
    type: address,
    required: true
  },
  ownerID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
}, {
  toJSON: {
    virtuals: true
  }
});
// Virtuals
productSchema.virtual('category', {
  ref: 'ProductCategory',
  localField: 'categoryID',
  foreignField: '_id',
  justOne: true
});
productSchema.virtual('owner', {
  ref: 'User',
  localField: 'ownerID',
  foreignField: '_id',
  justOne: true
});
productSchema.virtual('price', {
  ref: 'ProductPrice',
  localField: '_id',
  foreignField: 'productID'
});
// Hooks
productSchema.pre('validate', function(next) {
  const product = this;
  if (!product.createdDate) {
    product.createdDate = moment.utc();
  }
  next();
});
productSchema.pre('save', function(next) {
  const product = this;
  product.name = product.name.trim();
  product.modifiedDate = moment.utc();
  next();
});

// Instance methods
productSchema.methods.updateName = function(name) {
  if (typeof name === 'undefined') {
    return;
  } else if (name === null) {
    throw new createError.BadRequest();
  }
  this.name = name;
};
productSchema.methods.updateActive = function(active) {
  if (typeof active === 'undefined') {
    return;
  }
  this.active = active;
};
productSchema.methods.updateCategory = function(category) {
  if (typeof category === 'undefined') {
    return;
  } else if (category === null) {
    throw new createError.BadRequest();
  }
  this.category = category;
};
productSchema.methods.updateAddress = function(address) {
  if (typeof address === 'undefined') {
    return;
  }
  this.address = address;
};
productSchema.methods.setIsDeleted = function() {
  this.isDeleted = true;
};

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
