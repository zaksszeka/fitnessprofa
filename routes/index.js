var express = require('express');
var router = express.Router();
var async = require("async")

// MODELI
var UserModel=require("../models/user");
var TreningModel=require("../models/trening");
var IshranaModel=require("../models/ishrana");
var PlanModel=require("../models/plan");

/* GET home page. */
router.get('/', function (req,res) {
  if(req.session.user){
    console.log(req.session.user)
    res.render('index');
  } else {
    res.redirect("/login")
  }

});

router.get('/login', function (req,res) {
  res.render('login');

});
router.post('/login',function(req,res){
  var data=req.body;
  
  UserModel.findOne({email:data.email},function(err,result){
    if (err) throw err;
    console.log(result);
    if(result.password==data.password){
      req.session.user=result._id;
      res.redirect("/");
    }
  })
})


router.get('/logout', function(req, res) {
  req.session.user = null
  res.redirect("/login")
});

router.get('/reg', function(req, res) {
  res.render('registration');
});
router.post('/reg',function(req,res){
  var data=req.body;
  var userInstance=new UserModel({
    email:data.email,
    password:data.password
  })
  userInstance.save(function(err, result){
    if(err) throw err;
    req.session.user=result._id;
    res.redirect("/")
    console.log("Uspeo!")
  })
})
router.get('/planovi', (req, res) => {
  PlanModel.find((err,result)=>{
    res.send(JSON.stringify(result))
  })
})
router.get('/plan', function(req, res) {
  PlanModel.findOne({_userid:req.session.user},function(err,result){
    if (err) throw err;
    console.log(result);
    res.render("plan",{
      plan:result || ""
    })
  })
  
});
router.post('/plan',async function(req,res){
  var data=req.body;
  var treninzi = await TreningModel.find()
  var ishrane = await IshranaModel.find()
  var odabranaIshrana
  var odabranTrening
  if(data.tezina > 100) {
    odabranaIshrana = ishrane[0]._doc.text
  } else {
    odabranaIshrana = ishrane[1]._doc.text
  }

  switch(data.cilj) {
    case "mrsavljenje": {
      odabranTrening = treninzi[0]._doc.text;
      break;
    } 
    case "gojenje":{
      odabranTrening= treninzi[1]._doc.text;
      break;
    }
    case "powerlifting":{
      odabranTrening= treninzi[2]._doc.text;
      break;
    }
    case "crossfit":{
      odabranTrening= treninzi[3]._doc.text;
      break;
    }
    case "tegovi":{
      odabranTrening= treninzi[4]._doc.text;
      break;
    }
  }
  var userid=req.session.user;
  var planInstance=new PlanModel({
    _userid:userid,
    trening:odabranTrening,
    ishrana:odabranaIshrana
  })
  const postoji = await PlanModel.findOne({_userid:userid})
  if(postoji) {
    PlanModel.findOneAndUpdate({_userid:userid},{trening:odabranTrening, ishrana:odabranaIshrana},function(err,result){
      if (err) throw err;
      res.redirect("/plan");
    })
  } else {
    planInstance.save(function(err,result){
      if (err) throw err;
      res.redirect("/plan");
    })
  }
  
})



router.get('/utisak', function(req, res) {
  res.render('utisak');
});

router.get('/kontakt', function(req, res) {
  res.render('kontakt');
});

router.get('/noviplan', function(req, res) {
  res.render('noviplan');
});

router.get('/users', function(req, res) {
  UserModel.find(function(err,result){
    res.send(JSON.stringify(result))
  })
});

router.get('/citajtreninge', function(req, res) {
  TreningModel.find(function(err,result){
    res.send(JSON.stringify(result))
  })
});
router.get('/citajishranu', function(req, res) {
  IshranaModel.find(function(err,result){
    res.send(JSON.stringify(result))
  })
});

router.get('/izradaplana', function(req, res) {
  res.render('izradaplana');
});
router.post('/trening', function(req, res) {
  var data=req.body;
  var Trening=new TreningModel({
    text:data.text
  })
  Trening.save(function(err){
    if(err) throw err;
    res.redirect('/izradaplana')
  })
  
});
router.post('/ishrana', function(req, res) {
  var data=req.body;
  var Ishrana=new IshranaModel({
    text:data.text
  })
  Ishrana.save(function(err){
    if(err) throw err;
    res.redirect('/izradaplana')
  })
});






module.exports = router;
