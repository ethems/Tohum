const ObjectId = require('mongoose').Types.ObjectId;
const every = require('async/every');
const productPriceUnits = require('../models/subdocuments/product-price-units');

const isAddress = value => new Promise((resolve, reject) => {
  if (value && value.streetLine1 && value.city) {
    resolve();
  } else {
    reject('address is not correct format');
  }
});

const eachIsAddress = (value) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(value)) {
      every(value, (address, callback) => {
        isAddress(address).then(() => {
          callback(null, true);
        }).catch(() => {
          callback(null, false);
        });
      }, (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          resolve();
        } else {
          reject('value is not address');
        }
      });
    } else {
      reject('value is not array');
    }
  });
};

const isValidProductPriceUnit = (value) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(productPriceUnits);
    if (keys.includes(value)) {
      resolve();
    } else {
      reject();
    }
  });
};

const isValidPassword = (value) => {
  return new Promise((resolve, reject) => {
    if (value.length < 6) {
      reject('value should be at least 6 characters');
    } else {
      // const hasUpperCase = /[A-Z]/.test(value);
      // const hasLowerCase = /[a-z]/.test(value);
      // const hasNumber = /[\d]/.test(value);
      // const hasNonAlphas = /[\W]/.test(value);
      // if ((hasUpperCase + hasLowerCase + hasNumber + hasNonAlphas) >= 3) {
      //   resolve();
      // } else {
      //   reject('bad password');
      // }
      resolve();
    }
  });
};



module.exports = {
  isAddress,
  eachIsAddress,
  isValidProductPriceUnit,
  isValidPassword
};
