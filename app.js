'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
const jwtCheck = require('./lib/jwtCheck');
require('dotenv').config();

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// Loading Database connection with mongoose
require('./lib/mongooseConn');

// Loading Models
require('./models/Commercial');
require('./models/Users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (process.env.LOG_FORMAT !== 'nolog'){
    app.use(logger(process.env.LOG_FORMAT || 'dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

// Setting i18n
i18n.configure({
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    syncFiles: true,
    queryParameter: 'lang',
    register: global,
    cookie: 'nodeapi-lang',
});
i18n.setLocale('en');
app.use(i18n.init);


// Detecting languaje in header with x-lang
app.use((req, res, next) => {
  req.lang = req.get('x-lang') || 'en';
  next();
});

// Loading API Routes
app.use('/api/v1/commercials', jwtCheck(), require('./routes/api/v1/commercials'));

// Index route
app.use('/', jwtCheck(), require('./routes/index'));

// Controllers
const loginController = require('./routes/loginController');
app.post('/authenticate', loginController.authJWT);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
