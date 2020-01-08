var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: String
});

var UserModel = mongoose.model('UserModel', UserSchema );

module.exports=UserModel;
