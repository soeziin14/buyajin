var  express        = require('express'),
     bodyParser     = require('body-parser'),
     flash          = require('connect-flash'),
     methodOverride = require('method-override'),
     mongoose       = require("mongoose"),
     multer         = require("multer"),
     passport       = require("passport"),
     localStrategy  = require("passport-local"),
     path           = require('path'),
     app            = express();

var Post            = require("./models/post"),
    User            = require('./models/user');
//mongodb://jin:Rmdwjd14@ds053166.mlab.com:53166/buyajin
//define routes, set @ line 28.
var  routes          = require('./routes/index'),
     blog            = require('./routes/blog');

////mongoose.connect("mongodb://localhost/jin_blog");
mongoose.connect("mongodb://jin:Rmdwjd14@ds053166.mlab.com:53166/buyajin");
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//Set routes
app.use('/', routes),
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
