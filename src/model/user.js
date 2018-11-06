var mongoose = require('mongoose')

var userScheme = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
});

exports = module.exports = mongoose.model('User', userScheme);