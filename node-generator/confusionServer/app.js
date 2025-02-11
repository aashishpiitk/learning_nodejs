var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport-local');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var authenticate = require('./authenticate');
var User = require('./models/users');
var config = require('./config');

//mongo database config
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
//const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(config.mongourl, {useNewUrlParser:true,
                                  useUnifiedTopology: true})
connect.then((db) => {
  console.log("connected to database");
},(err) =>{console.log(err);});


//importing the routes
var dishRouter = require('./routes/dishRouter');
var users = require('./routes/users');

//creating an express app
var app = express();
//app.use(auth);

//passport config
app.use(passport.initialize());//passport.initialize is a middleware to connect the express app to passport
//app.use(passport.session())//passport.session middleware is useful when thereis need of sessions
//configuring the routers
app.use("/dishes",dishRouter);
app.use("/users", users);


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

//when using basic auth use these lines 


// function auth(req, res, next){
//   console.log(req.headers);

//   var authHeader = req.headers.authorization;

//   if(!authHeader){
//     var err = new Error("you are not authenticated");
//     res.setHeader("www-authenticate", "Basic");
//     err.status = 401;
//     next(err);
//     return;
//   }


// var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(":");
// var user = auth[0]
// var pass = auth[1]

// if(user == 'admin' && pass == "password"){
//   next();
// }
// else{
//   var err = new Error("wrong details");
//   res.setHeader("www-authenticate","Basic");
//   err.status = 401;
//   next(err);
// }
// }
