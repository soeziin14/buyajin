var  express        = require('express'),
<<<<<<< HEAD
=======
     path           = require('path'),
     logger         = require('morgan'),
     cookieParser   = require('cookie-parser'),
     mongoose       = require("mongoose"),
>>>>>>> c8a43c92ad6646a8a0325de4b9de3779b13262be
     bodyParser     = require('body-parser'),
     methodOverride = require('method-override'),
     mongoose       = require("mongoose"),
     multer         = require("multer"),
     path           = require('path'),
     app            = express();
//mongodb://jin:Rmdwjd14@ds053166.mlab.com:53166/buyajin
//define routes, set @ line 28.
var  routes          = require('./routes/index'),
     users           = require('./routes/users'),
     blog            = require('./routes/blog');

////mongoose.connect("mongodb://localhost/jin_blog");
mongoose.connect("mongodb://jin:Rmdwjd14@ds053166.mlab.com:53166/buyajin");
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

//Set routes
app.use('/', routes),
app.use('/users', users),
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


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
