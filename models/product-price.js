const mongoose = require('mongoose');
const productPriceUnits = require('./subdocuments/product-price-units');
const moment = require('moment');

const productPriceUnitsKeys = Object.keys(productPriceUnits);

const Schema = mongoose.Schema;

const productPriceSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: productPriceUnitsKeys,
    required: true
  },
  currency: {
    type: String,
    default: 'TRY',
    required: true
  },
  productID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  active: {
    type: Boolean,
    default: true
  }
});

// Hooks
productPriceSchema.pre('validate', function(next) {
  if (!this.startDate) {
    this.startDate = moment.utc();
  }
  next();
});

// Instance methods

// Class methods
productPriceSchema.statics.expirePrice = function(productID) {
  return this.update({
    productID,
    active: true
  }, {
    $set: {
      active: false,
      endDate: moment.utc()
    }
  });
};

productPriceSchema.statics.getAllSince = function(productID, date) {
  // Get all prices since specific date and with active one
  return this.find({
    $and: [{
      productID
    }, {
      $or: [{
        startDate: {
          $gte: date
        }
      }, {
        active: true
      }]
    }]
  });
};


const ProductPriceModel = mongoose.model('ProductPrice', productPriceSchema);

module.exports = ProductPriceModel;
