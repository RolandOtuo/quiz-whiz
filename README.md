# quiz-whiz
a responsive full-stack Quiz website with social media integration that allows users to 
create personalized quizlets and share scores their scores on Twitter


Qualities: 
-Allows users to create an account (Sign up/login), create quizzes, and post comments with full CRUD ability. 

Pages (with Routing Capability): 
-Landing Page- aesthetic page with a slide show display
- Sign Up Page- (Username, Password).
-Login Page- (Username, Password) or Authentication + Authorization. (Required to start a quiz) 
-Main Page- displays a collection of user-built quizzes; Add new Quiz button;
- Quiz page - provides multiple choice questions based on user-selected-category with a results page, some social integration (share results to Twitter). Has user Score board with previous scores. Users write comments below.
-New Comment Page- create comment;
-Edit Comment Page- edit a submitted comment.
- New Quiz Page- user creates a new quiz; sets category, number of questions, difficulty etc
-Edit Quiz Page- edit a submitted quiz.
-Responsive Quiz Page- has a timer; multiple-choice questions; hint button (deducts from user’s scores when used) (Score of the user will be calculated from correct attempts and time elapsed) 

Technologies used: 
Ejs, JavaScript, CSS, Bootstrap 4, font-awesome, Git (to keep track of repository), Nodejs (to install packages and test repository), Webpack (Bundler), Babel (Compiler), MongoDB Atlas to store and update user information (Password & username, quizzes and comments submitted) 
APIs: 
-Quiz API: Trivia Database; https://opentdb.com/api_config.php 
-twitter developer page: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent (to allow users to tweet scores) 
IDE: 
-Visual Studio Code 
deployment: 
-Heroku server, Postman to test routing 
npm dependencies: 
-Mongoose, ejs, ejs-mate, express, express-mongo sanitize, express-session (keeps user logged in until session time expires), moment.js (timestamps), passport.js (to authenticate user during log in), connect-flash, (to display flash messages on page), sanitize-html (to sanitize any user html input), connect-mongo, method-override (used for put request by express framework)), dotenv (to hide API access codes at the server side)
