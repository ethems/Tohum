const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const address = require('./subdocuments/address');
const stringUtil = require('../lib/utils/string-util');
const createError = require('http-errors');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  },
  name: {
    primaryName: {
      type: String,
      set: stringUtil.capitalize,
    },
    middleName: {
      type: String,
      set: stringUtil.capitalize,
    },
    lastName: {
      type: String,
      set: stringUtil.capitalize,
    }
  },
  addresses: [address],
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
});


// Hooks
userSchema.pre('validate', function(next) {
  const user = this;
  if (!user.createdDate) {
    user.createdDate = moment.utc();
  }
  next();
});

userSchema.pre('save', function(next) {
  const user = this;
  user.modifiedDate = moment.utc();
  const saltRound = 10;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRound, (err0, salt) => {
      if (err0) {
        return next(err0);
      }
      bcrypt.hash(user.password, salt, (err1, hash) => {
        if (err1) {
          return next(err1);
        }
        user.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
});

// Static methods
userSchema.statics.safeFindById = function(id) {
  const user = this;
  const safeProjection = {
    password: false,
    __v: false
  };
  return user.findById(id, safeProjection);
};

// Instance methods

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.methods.updateEmail = function(email) {
  if (typeof email === 'undefined') {
    return;
  } else if (email === null) {
    throw new createError.BadRequest();
  }
  this.email = email;
};
userSchema.methods.updatePassword = function(password) {
  if (typeof password === 'undefined') {
    return;
  } else if (password === null) {
    throw new createError.BadRequest();
  }
  this.password = password;
};
userSchema.methods.updateName = function(name) {
  if (typeof name === 'undefined') {
    return;
  }
  this.name = name;
};
userSchema.methods.updateAddresses = function(addresses) {
  if (typeof addresses === 'undefined') {
    return;
  }
  this.addresses = addresses;
};


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
