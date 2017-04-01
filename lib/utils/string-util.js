const mongoose = require('mongoose');
const validator = require('validator');


const capitalize = (val) => {
  if (!val) {
    return '';
  }
  return val.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
};
const compareObjectIdStrings = (val1Str, val2Str) => {
  if (!val1Str && !val2Str) {
    return true;
  }
  if (!val1Str || !val2Str) {
    return false;
  }
  if (validator.isMongoId(val1Str) && validator.isMongoId(val2Str)) {
    const val1Str_OID = mongoose.Types.ObjectId(val1Str);
    const val2Str_OID = mongoose.Types.ObjectId(val2Str);
    if (val1Str_OID.equals(val2Str_OID)) {
      return true;
    }
    return false;
  }
  return false;
};

module.exports = {
  capitalize,
  compareObjectIdStrings
};
