var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var planSchema = new Schema({
  _userid: mongoose.SchemaTypes.ObjectId,
  trening:String,
  ishrana:String
});

var planModel = mongoose.model('planModel', planSchema );

module.exports=planModel;