var Movie = require("../models/movies");
var Comment = require("../models/comments");
var middleware = {};

middleware.checkMovieOwnership = function (req,res,next){
    if(req.isAuthenticated()){
         Movie.findById(req.params.id , function(err , foundMovie){
        if(err){
            res.redirect('back');
        } else {
            if(foundMovie.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
                }
            }
        })
            
    } else {
        req.flash("error" , "Sorry! You aren't allowed to do that");
        res.redirect("back");
    }
}


middleware.checkCommentOwnership = function(req,res,next){
  //is the user logged in 
  if(req.isAuthenticated()){
      
      Comment.findById(req.params.comment_id , function(err,foundComment){
           
           if(err){
               //if doesn't match then do a back redirect
              req.flash("error" , "Couldn't find the following comment");
              res.redirect("back");
           } else {
               //if yes then check if the author name of the campground matches with user's username
               if(foundComment.author.id.equals(req.user._id)){
                   //if usernames match then do next();
                   next();
               } else {
                  req.flash("error" , "Sorry , you dont have the permission to do the following");
                  res.redirect("back");
               }
           }
      });
  } else {
      //if not logged in then redirect to back
      req.flash("error" , "Sorry , you dont have the permission to do the following");
      res.redirect("back");
  }
};


middleware.isLoggedIn = function(req,res,next){
   if(req.isAuthenticated()){
      return next();
  }  else {
      req.flash("error" , "You need to be logged in first")
      res.redirect("/login");
  }
}

module.exports = middleware ;