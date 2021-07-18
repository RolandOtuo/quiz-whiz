var express = require("express");
var router = express.Router({mergeParams: true});
var Quiz = require("../models/quiz");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=====================
//COMMENT ROUTES
//=====================
//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find quizes by id
	Quiz.findById(req.params.id, function(err, quiz){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {quiz: quiz});
		}
	})
});

//comment Create
router.post("/",  middleware.isLoggedIn, function(req, res){
	//lookup quiz using ID
	Quiz.findById(req.params.id, function(err, quiz){
		if(err){
			console.log(err)
			res.redirect("/quizes");
		} else {
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					quiz.comments.push(comment);
					quiz.save();
					req.flash("sucess", "Successfully added comment")
					res.redirect("/quizes/" + quiz._id);
				}
			})
		}
	})
	
	//connect new comment to quiz
	//redirect quiz show page
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Quiz.findById(req.params.id, function(err, foundQuiz){
		if(err || !foundQuiz){
			req.flash("error", "No quiz found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				res.render("comments/edit", {quiz_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/quizes/" + req.params.id);
		}
	});
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/quizes/" + req.params.id);
		}
	});
});

module.exports = router;