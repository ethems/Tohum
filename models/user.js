const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.pre('save', function(next) {
  const user = this;
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
  }
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
