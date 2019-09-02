const express = require('express');


var     router      = express.Router(),
        passport    = require("passport") , 
        Movie       = require("../models/movies.js"),
        middleware  = require("../middleware/index"),
        Comment     = require('../models/comments.js');
         
         
router.get("/moviebase/:id/comments/new", middleware.isLoggedIn , (req , res)=>{
    Movie.findById(req.params.id , (err , movie)=>{
       if(err){
           console.log(err);
       } else {
            res.render("comments/new" , {movie : movie});
       }
    });
});

//POST ROUTE FOR THE NEW COMMENT
router.post("/moviebase/:id/comments", middleware.isLoggedIn  , (req,res) => {
    Movie.findById(req.params.id , function(err , movie){
        if(err){
            console.log(err);
            res.redirect("movies/moviebase"); 
        } else {
            Comment.create(req.body.comment , function(err , comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id ;
                    comment.author.username = req.user.username ;
                    comment.save();
                    movie.comments.push(comment);
                    movie.save();
                    res.redirect('/moviebase/' + movie._id);
                }
            })
        }
    })
});

//EDIT COMMENTS
router.get("/moviebase/:id/comments/:comment_id/edit" , function(req,res){
    Comment.findById(req.params.comment_id , function(err , foundComment){
      if(err){
          res.redirect("back");
      }  else {
          res.render("comments/edit" , {movie_id: req.params.id , comment: foundComment})
      }
    });
});

router.put("/moviebase/:id/comments/:comment_id" ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err , updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success" , "Succesfully , edited the comment");
            res.redirect("/moviebase/" + req.params.id); 
        }
    })
});

router.delete("/campgrounds/:id/comments/:comment_id" , function(req ,res ){
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
      if(err){
          res.redirect("back");
      }  else {
          req.flash("success" , "Your comment was deleted!");
          res.redirect("/campgrounds/" + req.params.id) ;
      }
    });
});




module.exports = router ;