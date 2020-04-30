var     express         = require('express'),
        mongoose        = require("mongoose"),
        bodyParser      = require("body-parser"),
        request         = require('request'),	
        methodOverride  = require("method-override"),
        passport        = require("passport") , 
        LocalStrategy   = require("passport-local") ,
        Movie           = require("./models/movies") ,
        flash           = require('connect-flash'),
        Comment         = require('./models/comments'),
        User            = require('./models/user'),
        seedDB          = require('./seeds'),
    	app             = express();
		
//routes 		
var     commentRoutes   = require('./routes/comments'),
        moviebaseRoutes = require('./routes/moviebase'),
        indexRoutes     = require('./routes/index');
     
var port = process.env.PORT || 3000 ,
    mongoURI = "mongodb://DeViLINSIDE:wantedming87396@ds237770.mlab.com:37770/reelviu";

mongoose.connect(mongoURI, { useUnifiedTopology: true } , { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// seedDB();

app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));

//Flash messages
app.use(flash());

//Authentication
app.use(require("express-session")({
    secret : "Once again batman is the best superhero" , 
    resave : false ,
    saveUninitialized : false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//for using all them in every place wihout sending them seperately
app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    next();
})

//importing routes and later using them
app.use(indexRoutes);
app.use(commentRoutes);
app.use(moviebaseRoutes);

//Listening to port
app.listen(port , function(){
    console.log(`Server has started at ${port}`);
})