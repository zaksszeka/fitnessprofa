var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TreningS = new Schema({
  text: String
  
});

var TreningModel = mongoose.model('TreningModel', TreningS );

module.exports=TreningModel;