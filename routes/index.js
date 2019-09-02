const express = require('express');

var     router      = express.Router(),
        passport    = require("passport") , 
        Movie       = require("../models/movies"),
        User        = require('../models/user');

//=====AUTH ROUTES=====

router.get('/' , function(req,res){
	res.render('landing');
})


//register route
router.get("/register",function(req, res){
   res.render('register') ;
});

//post request for sign up
router.post("/register",function(req, res){
   var newUser = new User({username : req.body.username});
   User.register(newUser , req.body.password , function(err , user){
       if(err){
           console.log(err);
           return res.render("/register");
       } else {
           passport.authenticate("local")(req, res , function(){
               res.redirect("/moviebase");
           });
       }
   })
});

//SHOW LOGIN FORM
router.get("/login" , function(req,res){
    res.render("login");
});

//post request for login page
router.post("/login" ,passport.authenticate("local" , 
    {   
        successRedirect : "/moviebase" ,
        failureRedirect : "/login"
    }) , function(req,res){
    
});

router.get("/logout" , function(req,res){
   req.logout();
   req.flash("success" , "You have been successfuly logged out!")
   res.redirect("/moviebase");
});

function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
      return next();
  }  else {
      res.redirect("/login");
  }
}

module.exports = router ;