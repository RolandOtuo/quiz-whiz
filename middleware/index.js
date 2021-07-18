var Quiz = require("../models/quiz");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkQuizOwnership = function(req, res, next){
	//is user logged in
	if(req.isAuthenticated()){
		Quiz.findById(req.params.id, function(err, foundQuiz){
			if(err || !foundQuiz){
				req.flash("error", "Quiz not found");
				res.redirect("back");
			} else {
				//does user own the quiz?
				//console.log(founQuiz.author.id) is a mangoose obj
				//console.log(req.user._id) is a string; cant compare both with ==
				if(foundQuiz.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	//is user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				// does user own the comment?
				if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");				}
			}
		});
	} else {
		req.flash("error", "You need to be logged to do that")
		res.redirect("back");
	}
}

//middleware
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;