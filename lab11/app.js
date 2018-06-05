var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./models/news');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/notice', newsRouter.show);
app.get('/new-notice',function (req, res) {
    res.render('new_notice')
});

app.post('/notice', newsRouter.create);
app.post('/notice/update', newsRouter.showUpdate);
app.post('/notice/delete', newsRouter.delete);
app.post('/notice/detail',newsRouter.showComents);
app.post('/notice/update-go',newsRouter.update);
app.get('/comment_createView', newsRouter.createCommentView);
app.post('/comment_create', newsRouter.commentCreate);
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
