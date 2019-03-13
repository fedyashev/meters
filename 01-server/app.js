const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = process.env.NODE_ENV || 'development';

const helmet = require('helmet');

require('./models');
require('./models/hooks');
require('./models/methods');

require('./passport');

const api_v1 = require('./routes/api-v1');

const app = express();

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

app.use(helmet());

switch (env) {
  case 'production': {

    app.enable('trust proxy');
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });

    const logDirectory = path.join(__dirname, 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    app.use(logger('combined', {stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })}));
    app.use(logger('dev'));
    break;
  }

  case 'test': {
    break;
  }

  default: {
    app.use(logger('dev'));
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api_v1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Resource not found'));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  const code = err.status || 500;
  const message = err.message || 'error';

  // render the error page
  res.status(code);
  res.json({ error: { code, message } });
  //res.render('error');
});

module.exports = app;
