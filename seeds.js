var mongoose = require("mongoose");
var Quiz = require("./models/quiz");
var Comment = require("./models/comment");

//This is just a data model for testing
var data = [
	{
		name: "Quiz on General Knowledge", 
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsdrXagsn1fBQY1LnP1pQJ66O2-s4jIE99pQ&usqp=CAU",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	},
	{
		name: "Quiz on media", 
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrmf2FYSi6Qc54GdiebUB6Z1WC9JgudT-3jQ&usqp=CAU",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	},
	{
		name: "Quiz on History", 
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNKvLoQQwb08po145ES65J6cP-Ru3TIPERzA&usqp=CAU",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	}
]

function seedDB(){
	//Remove all quizes
		Quiz.remove({}, function(err){
		if(err){
			console.log(err)
		} else {
			console.log("removed quizes!");
			//add a few quizes
			data.forEach(function(seed){
				Quiz.create(seed, function(err, quiz){
					if(err){
						console.log(err)
					} else {
						console.log("added quiz");
						//create a comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
							}, function(err, comment){
								if(err){
									console.log(err)
								} else {
									quiz.comments.push(comment);
									quiz.save();
									console.log("Created new comment");
								}
							});
					}
				});
			});
		}
	});
}

module.exports = seedDB;