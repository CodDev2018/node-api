const PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());

// Banco de dados
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_api', { useNewUrlParser: true });

//Routes
require('./src/routes')(app)

//Escutando porta
app.listen(PORT)

console.log('Magic happens on port ' + PORT);
exports = module.exports = app;
