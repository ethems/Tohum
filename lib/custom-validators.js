const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  isAddress: value => new Promise((resolve, reject) => {
    if (value && value.streetLine1 && value.city) {
      resolve();
    } else {
      reject('address is not correct format');
    }
  }),
  isObjectId: value => new Promise((resolve, reject) => {
    if (value && ObjectId.isValid(value)) {
      resolve();
    } else {
      reject('value is not ObjectId');
    }
  })
};
