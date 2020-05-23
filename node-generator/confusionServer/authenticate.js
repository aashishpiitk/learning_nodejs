var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');//used to create,sing and verify tokens

var config = require('./config');

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn : 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//adding a field to opts which contains the token extracted from authHeader
opts.secretOrKey = config.secretKey;//adding a field to opts which contains the secret key extracted from config file

exports.jwtPassport = passport.use(new JwtStrategy(opts, //passport local is being used
    (jwt_payload, done) => {//done is a callback funtion
        console.log("JWT payload: ",jwt_payload);
        User.findOne({_id : jwt_payload._id}, (err, user) => {//verify callback is used to find the user with the credentials
            if(err){
                return done(err, false);
            }
            else if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});//this is used in dishRouter

// exports.local = passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));