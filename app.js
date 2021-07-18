const express 		= require("express"),
	app 			= express(),
	session 		= require("express-session");
 	MongoStore 		= require("connect-mongo")(session);
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	flash			= require("connect-flash"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	MethodOverride 	= require("method-override"),
	Quiz 		= require("./models/quiz"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user"),
	seedDB 			= require("./seeds")

//requiring routes
var commentRoutes 		= require("./routes/comments"),
	quizRoutes 	= require("./routes/quizes"),
	indexRoutes 		= require("./routes/index")

// mongoose.connect("mongodb://localhost:27017/quiz_whiz", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/quiz_whiz';
mongoose.connect( dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(MethodOverride("_method"));
app.use(flash());

const secret = process.env.SECRET || 'thisismyveryownsecret!';

//seedDB(); //seed the database

// session setup
app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } // 180 minutes session expiration
}));

//PASSPORT CONFIG

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/",indexRoutes);
app.use("/quizes", quizRoutes);//puts quiz before quizRoutes
app.use("/quizes/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`QuizWhiz Server is running on port ${ port }`);
});