var express = require('express');
var app = express();
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');
var dataRoutes = require('./routes/dataRoute');

app.use('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/static',express.static(path.join(__dirname, '/build/static/')));
app.use('/assets',express.static(path.join(__dirname, '/build/assets/')));

// APP routing
app.use('/', index);
app.use('/conflict', index);
app.use('/route/:id', index);
app.use('/about',index);

// API routing
app.use('/data',dataRoutes);

// catch 404
app.use(function(req, res, next) {next(404)});

module.exports = app;
