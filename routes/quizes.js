var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz");
var middleware = require("../middleware");//since index.js
//INDEX ROUTE-show all campgrouds
router.get("/", function(req, res){
	//get all quizes from DB
	Quiz.find({}, function(err, allQuizes){
		if(err){
			console.log(err);
		} else {
			res.render("quizes/index", {quizes: allQuizes, currentUser: req.user});
		}
	});
});

//CREATE ROUTE- add new quiz to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to quiz areay
	var name = req.body.name;
	var difficulty = req.body.difficulty
	var quesnum = req.body.quesnum
	var category = req.body.category
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newQuiz = {name: name, difficulty: difficulty, quesnum: quesnum, category: category, image: image, description: desc, author: author};
	
	Quiz.create(newQuiz, function(err){
		if(err){
			console.log(err);
		} else {
			//redirect back to quizes page
			res.redirect("/quizes");
		}
	})
	
})

//NEW - show form to create new quiz
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("quizes/new");
});

//SHOW - shows more info about one quiz
router.get("/:id", function(req, res){
	//find the quiz with provided id
	Quiz.findById(req.params.id).populate("comments").exec(function(err, foundQuiz){
		if(err || !foundQuiz){
			req.flash("error", "Quiz not found");
			res.redirect("back");
		} else {
			//then render show template with that quiz
			res.render("quizes/show", {quiz: foundQuiz});
		}
	});
});

// EDIT QUIZ ROUTE
router.get("/:id/edit", middleware.checkQuizOwnership, function(req, res){
	//is user logged in
	Quiz.findById(req.params.id, function(err, foundQuiz){
				//does user own the quiz?
				//console.log(founQuiz.author.id) is a mangoose obj
				//console.log(req.user._id) is a string; cant compare both with ==
		res.render("quizes/edit", {quiz: foundQuiz});
	});
}); 

//UPDATE QUIZ ROUTE
router.put("/:id", middleware.checkQuizOwnership, function(req, res){
	//find and update the correct quiz
	Quiz.findByIdAndUpdate(req.params.id, req.body.quiz, function(err, updatedQuiz){
		if(err){
			res.redirect("/quizes");
		} else {
			res.redirect("/quizes/" + req.params.id);
		}
	} )
})

//DESTROY QUIZ ROUTE
router.delete("/:id", middleware.checkQuizOwnership, function(req, res){
	Quiz.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/quizes");
		} else {
			res.redirect("/quizes");
		}
	});
});



module.exports = router;