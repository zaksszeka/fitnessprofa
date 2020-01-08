var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IshranaS = new Schema({
  text: String
  
});

var IshranaModel = mongoose.model('IshranaModel', IshranaS );

module.exports=IshranaModel;