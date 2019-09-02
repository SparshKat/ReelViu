var  mongoose    = require("mongoose");

var movieSchema = new mongoose.Schema ({
  title : String ,
  year  : Number,
  image : String ,
  review : String ,
  author : {
      id: {
         type : mongoose.Schema.Types.ObjectId, 
         ref : "Admin"
      } ,
   username  : String 
   } ,
  comments : [
      {  
         type : mongoose.Schema.Types.ObjectId ,
         ref : "Comment"
      }
  ]
});

module.exports = mongoose.model("Movie" , movieSchema);
