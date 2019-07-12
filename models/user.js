const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
   name: {type: String, required: true},
   email: {type: String, required: true, lowercase: true, unique: true},
   password: {type: String, required: true},
   admin: Boolean
}, {
   timestamps: true
});

userSchema.set('toJSON', {
   transform: (doc, ret) => {
   // remove the password property when serializing doc to JSON
   delete ret.password;
   return ret;
   }
});

userSchema.pre('save', function(next) {
   const user = this;
   if (!user.isModified('password')) return next();
   bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
   });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
   bcrypt.compare(tryPassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
   });
};

module.exports = mongoose.model('User', userSchema);