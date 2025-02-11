// var User = require('../models/users');
// var jwt = require('jsonwebtoken');
// var config = require('../config.js');

// exports.getToken = (user) => {
//     return jwt.sign(user, config.secretKey,{
//         expiresIn : 3600
//     });
// };

// exports.verifyOrdinaryUser = (req, res, next) => {
//     //check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token']

//     //decode token
//     if(token){
//         //verifies secrets and checks exp state
//         jwt.verify(token, config.secretKey, (err, decoded) => {
//             if(err){
//                 var err = new Error("you are not authenticated");
//                 err.status = 401;
//                 return next(err);
//             }
//             else{
//                 //if everything is good then save to request for use in other routes
//                 req.decoded = decoded;//creates a new field in request named decoded which stores the decoded jwt token
//                 next();//sends the requets to next route
//             }
//         });
//     }
//     else{
//         var err = new Error("invalid token or no token provided");
//         err.status = 403;
//         return next(err);
//     }
// };