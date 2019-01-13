var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const models = require('./models');

const api_v1 = require('./routes/api-v1');

var app = express();

// models.sequelize.sync()
//   .then(result => {
//     if (result) {
//       console.log("Tables created.");
//     }
//     else {
//       console.log("Db error");
//     }
//   })
//   .catch(err => {
//     console.log("DB Error");
//   });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api_v1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: {code: err.status || 500, message: err.message}});
  //res.render('error');
});

module.exports = app;
