var express = require('express');
var app = express();
var path = require('path');

// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var dataRoutes = require('./routes/dataRoute');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


const mongoose = require('mongoose');
mongoose.connect('mongodb://production:production@ds145118.mlab.com:45118/refugee-flow');

app.use('/static',express.static(path.join(__dirname, '/build/static/')));
app.use('/assets',express.static(path.join(__dirname, '/build/assets/')));
app.use('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/war', index);
app.use('/route', index);
app.use('/data',dataRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {next(404)});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
