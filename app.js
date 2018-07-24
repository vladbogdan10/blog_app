var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    flash          = require('connect-flash'),
    passport       = require('passport'),
    methodOverried = require('method-override'),
    User           = require('./models/user');

// REQUIRE ROUTES
var indexRoutes   = require('./routes/index'),
    blogRoutes    = require('./routes/blog'),
    commentRoutes = require('./routes/comment'),
    adminRoutes   = require('./routes/admin'),
    userRoutes    = require('./routes/user');

// APP CONFIG
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/blog_app';
mongoose.connect(url);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/node_modules/trumbowyg/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverried('_method'));
app.use(flash());

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'I love node.js',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);
app.use(adminRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3000, process.env.IP);