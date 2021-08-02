var mongoose = require("mongoose");
//SCHEMA SETUP
var quizSchema = new mongoose.Schema({
	name: String,
	difficulty: String,
	category: String,
	quesnum: String,
	image: String,
	description: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}, 
		username: String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Quiz", quizSchema);