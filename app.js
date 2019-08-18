var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Worker=require("./models/worker.js");


app.use(express.static(__dirname+"/public"));



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost/mamacompany",{ useNewUrlParser: true });



app.get("/",function(req,res){
    res.render("home");
});

app.post("/login",function(req,res){
    var name=req.body.username;
    var pass=req.body.password;
    if(name=="prakash026"&&pass=="RajuDonHai")
     res.redirect("/workers");
});

app.get("/workers", function(req,res){
   Worker.find({},function(error,allworkers){
     if(error)
      console.log("error");
     else
     {
      res.render("workers/index",{workers : allworkers});
     }
   });
});


//location is spelled locatio
app.post("/workers/new",function(req,res){
    var name=req.body.name;
    var location=req.body.location;
    var age=req.body.age
    var description=req.body.description;
    var newworker={name : name, age : age, description : description, location : location };
    Worker.create(newworker,function(error,newlyCreatedWorker){
     if(error)
      console.log(error);
     else
     {
         console.log(newlyCreatedWorker);
      res.redirect("/workers");
     } 
    });
});


app.get("/new",function(req,res){
   res.render("workers/new");
});


app.get("/workers/:id",function(req,res){
  Worker.findById(req.params.id).exec(function(err,foundworker){
     if(err)
      console.log(err);
      else
      {
         console.log(foundworker);
       res.render("workers/show", {worker : foundworker});
      }
    });
});








app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started");
});