var mongoose = require('mongoose')
var sha256 = require('crypto-js/sha256')
var uniqueValidator = require('mongoose-unique-validator');

var userScheme = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

userScheme.plugin(uniqueValidator);

userScheme.pre('save', function(next) {
    this.password = sha256(this.password)
    next();
});

exports = module.exports = mongoose.model('User', userScheme);