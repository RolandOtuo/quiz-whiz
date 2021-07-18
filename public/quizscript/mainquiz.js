//get the main divs
const quiz_area = document.querySelector(".quiz-area");
const quiz_info = document.getElementById("quiz-info");

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const categorytag = document.querySelector(".title");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const twitterBtn = document.getElementById('twitter');
const finalScore = document.getElementById("final-score")
const quizName = document.getElementById("Qname")
const hintBtn = document.getElementById("hint");
const scoreBoard = document.getElementById("score-board");

// if startQuiz button clicked
if (start_btn) {
    start_btn.onclick = ()=>{
        info_box.classList.add("activeInfo"); //show info box
    }
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}



let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let finalScoreVal = 0;
let hintUsed = 0;
let counter;
let recentScores = [];
let counterLine;
let widthValue = 0;
let timeElapse = 0;
let totalTimeElapse = 0;
finalScore.innerText = '0';

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    hintUsed = 0;
    userScore = 0;
    finalScoreVal = 0;
    finalScore.innerText = '0';
    let timeElapse = 0;
    let totalTimeElapse = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    hintBtn.style.display = "block";

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    categorytag.innerHTML = questions[index].category;
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    hintBtn.onclick = ()=>{
        hintUsed ++;
        finalScoreVal -= 10;
        let hintAns = questions[que_count].answer;
        const wrongHints = [];
        let randNum = Math.floor(Math.random() * 2);
        let randWrongNum = Math.floor(Math.random() * 3);

        for(i=0; i < option.length; i++){
            if (option[i].textContent !== hintAns) {
                wrongHints.push(option[i].textContent);
            }
        }
        //console.log(wrongHints);
        option[1-randNum].innerHTML =  '<span>'+ wrongHints[randWrongNum] +'</span>'
        option[randNum].innerHTML =  '<span>'+ hintAns +'</span>'//an option;

        option[2].style.display = "none";
        option[3].style.display = "none";
        hintBtn.style.display = "none";
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        finalScoreVal += 100 - timeElapse;
        //console.log(finalScoreVal);
        if (finalScore < 0) {
            finalScore.innerText = '0';
        } else {
            finalScore.innerText = finalScoreVal;
        }
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        //console.log("Correct Answer");
        //console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        //console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                //console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<p>and congrats! 🎉, You got <span style="display:inline;">'+ userScore +'</span> out of <span style="display:inline;">'+ questions.length +'</span> in <span style="display:inline;">'+'</span> seconds with <span style="display:inline;">'+ (hintUsed) +' hints</span></p>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        displayRecentScore();
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<p>and nice 😎, You got <span style="display:inline;">'+ userScore +'</span> out of <span style="display:inline;">'+ questions.length +'</span> in <span style="display:inline;">'+'</span> seconds with <span style="display:inline;">'+ (hintUsed) +' hints</span></p>';
        scoreText.innerHTML = scoreTag;
        displayRecentScore();
    }
    else{ // if user scored less than 1
        let scoreTag = '<p>and sorry 😐, You got only <span style="display:inline;">'+ userScore +'</span> out of <span style="display:inline;">'+ questions.length +'</span> in <span style="display:inline;">'+ totalTimeElapse +'</span> seconds with <span style="display:inline;">'+ (hintUsed) +' hints</span></p>';
        scoreText.innerHTML = scoreTag;
        displayRecentScore();
    }
}

function displayRecentScore() {
    recentScores.push(finalScore);
    recentScores.reverse().forEach(function(score) {
        const selectedScore = document.createElement('li');
        selectedScore.textContent = finalScoreVal;
        selectedScore.classList.add('list-group-item');
        selectedScore.style.backgroundColor = "#cce5ff";
        selectedScore.style.fontWeight = "bold";
        scoreBoard.insertBefore(selectedScore, scoreBoard.firstChild);
        scoreBoard.appendChild('<hr>'); //necessary error
    })
    //console.log(recentScores);
}

function startTimer(time){
    let temp = time;
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    //console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
        timeElapse = temp - time; //caldcute time elapse on a question;
        totalTimeElapse += timeElapse;
    }
    //console.log(timeElapse);
}

function startTimerLine(time){
    
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

// Tweet Quote
function tweetQuote() {
    const quizNameText = quizName.innerText
    const tweetScore = finalScore.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=my most recent QuizWhiz score for ${quizNameText} is ${tweetScore}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);

