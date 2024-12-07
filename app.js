//package.json (start script) -> bin/www -> app.js -> routes -> views -> logger
// Import các module cần thiết
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); 
const logger = require("./logger.js");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Tạo ứng dụng Express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Thư mục chứa view
app.set('view engine', 'hbs');  // Sử dụng Handlebars làm view engine


app.use(morgan('combined', { stream: logger.stream })); // Ghi log request
app.use(express.json());                              // xử lý json
app.use(express.urlencoded({ extended: false }));    // Xử lý URL-encoded
app.use(cookieParser());                                    // Xử lý cookie
app.use(express.static(path.join(__dirname, 'public')));  // Cung cấp file tĩnh

// Định nghĩa route chính "/"
app.use('/', indexRouter);
// Định nghĩa route "/users"
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
