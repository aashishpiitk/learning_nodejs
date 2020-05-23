var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    // username : String,
    // password : String,
    admin : {
        type : Boolean,
        default : false
    }
});

User.plugin(passportLocalMongoose);//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

module.exports = mongoose.model('User',User);//mongoose automatically converts User to Users