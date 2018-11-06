var mongoose = require('mongoose')

var postScheme = new mongoose.Schema({
    titulo: { type: String, require: true },
    conteudo: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

exports = module.exports = mongoose.model('Post', postScheme);