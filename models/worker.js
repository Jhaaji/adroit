var mongoose=require("mongoose");

var workerSchema=new mongoose.Schema({
 
 name : String,
 age : Number,
 location : String,
 description : String,
 
 
});



module.exports= mongoose.model("Destination",workerSchema);