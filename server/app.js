'use strict';

// Module dependencies
var express = require('express');
var colors = require('colors');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// Database
mongoose.connect('mongodb://localhost/officehours');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('conned to db')
});

// Create server
var app = express();

// Configure server
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());

// Mount statics
app.use(express.static(path.join(__dirname, '../.tmp')));
app.use(express.static(path.join(__dirname, '../client')));

// Route index.html
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '../client/index.html'));
});

require('./models/officehour');
require('./routes')(app);

app.instructors = [];
app.instructors.britt = {
  name: 'Brittney Kernan',
  img: 'brittney.jpg',
  email: 'ga@brittneykernan.com'
};

// Start server
http.createServer(app).listen(app.get('port'), function() {
  console.log(
    'Express server listening on port '.green + app.get('port'),
    '\nPress Ctrl+C to shutdown'.grey
  );
});
