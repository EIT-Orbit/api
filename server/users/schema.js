var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var uniqueValidator = require('mongoose-unique-validator');
var SALT_WORK_FACTOR = 10;

Promise.promisifyAll(bcrypt);

var UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: false},
  fences: [{type: mongoose.Schema.Types.ObjectId}]
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
