var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var verify = require('./verify');
var authenticate = require('../authenticate');//used in creating the token
/* GET users listing. */
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  //console.log(req.body.username);
  User.register(new User({username : req.body.username}),//User.register is a feature of passport local mongoose
  req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.json = ({err: err});
      // return res.status(500).json({err : err});
    }
    else{
      passport.authenticate('local')(req, res, () => {//local strategy used to register the user with usernae and pass,no jwt required here
        res.statusCode = 200;
        res.json({success: true, status: "Registration Successful"});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {//when the user logins for the first time after the token has expired then local strategy is used to login the user
  var token = authenticate.getToken({_id: req.user._id});//returns the signed token
  //after the user is logged in for the first time after the expiration of token ,using local strategy he is logged in and then issued a token
  //above line is used to create the token which is passed in the last line
  res.statusCode = 200;
  //res.setHeader("content type","application/json");
  res.json({success: true, token: token, status: "You are successfully loggedin"});
});

module.exports = router;
