const express = require('express');


var     router      = express.Router(),
        passport    = require("passport") , 
        Movie       = require("../models/movies"),
        request     = require("request"),
        Comment     = require('../models/comments'),
        middleware  = require("../middleware/index");
        
        
router.get("/moviebase" , function(req,res){
    Movie.find({} , (err, allMovies)=>{
        if(err){
            req.flash("error" , err.message);
        } else {
            res.render("movies/index" , {movies : allMovies });
        }
    });
});

router.get('/moviesearch' , function(req,res){
    var title = req.query.search;
    request(`https://www.omdbapi.com/?apikey=9917d6e1&s="${title}"` , (err, response,body)=>{
        if(!err && response.statusCode == 200){
            var body = (JSON.parse(body)).Search;
            res.render('search', {movies : body});
        }
    })
})


router.post("/moviebase" , function(req,res){
    var newTitle = req.body.title;
    var newImage = req.body.image ;
    var newYear = req.body.year ;
    var newReview = req.body.review ;
    var newObject = {
        title : newTitle , 
        image : newImage ,
        year :  newYear , 
        review : newReview
    };
    Movie.create(newObject , function(err, newMovie){
        if(err){
            req.flash("error" , err.message)
        } else {
            res.redirect("/moviebase");
        }
    })
});

//SHOW A FORM FOR NEW MOVIE
router.get("/moviebase/new" , (req,res)=>{
   res.render('movies/new');
})

//SHOW A SPECIFIC MOVIE 
router.get("/moviebase/:id" , function(req,res){
   Movie.findById(req.params.id).populate("comments").exec(function(err , foundMovie){
       if(err){
           console.log("ERROR HAS BEEN DETECTED");
       } else {
           res.render("movies/show" , {movie : foundMovie}); 
       }
   });
});

router.get("/moviebase/:id/edit", middleware.checkMovieOwnership , function(req,res){
    Movie.findById(req.params.id , function(err,foundMovie){
        if(err){
           console.log("ERROR HAS BEEN DETECTED");
        } else {
            res.render('movies/edit' , {movie : foundMovie});
       }
    })
   
});

router.put("/moviebase/:id", middleware.checkMovieOwnership , (req,res)=>{
   Movie.findByIdAndUpdate(req.params.id , req.body.movie , function(err ,updatedMovie){
       if(err){
          req.flash("error" , "Sorry , Couldn't edit the movie");
           res.redirect("/moviebase/:id");
       } else {
          req.flash("success" , "Succesfully edited the movie!!");
           res.redirect("/moviebase/" + req.params.id);
       }
   }) 
});

router.delete("/moviebase/:id", middleware.checkMovieOwnership , function(req,res){
   Movie.findByIdAndRemove(req.params.id , (err)=>{
      if(err){
          req.flash("error" , "Sorry , Couldn't delete movie");
          res.redirect("/moviebase");
      } else {
          req.flash("success" , "Succesfully deleted the movie!!");
           res.redirect("/moviebase");
      }
   });
});



module.exports = router ;