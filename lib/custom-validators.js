const ObjectId = require('mongoose').Types.ObjectId;
const every = require('async/every');

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



module.exports = {
  isAddress,
  eachIsAddress,
  isObjectId: value => new Promise((resolve, reject) => {
    if (value && ObjectId.isValid(value)) {
      resolve();
    } else {
      reject('value is not ObjectId');
    }
  })
};
