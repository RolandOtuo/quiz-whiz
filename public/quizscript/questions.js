//targeting elements

const categoryType = document.getElementById("category-type").innerText;
const difficultyType = document.getElementById("difficulty-type").innerText;
const quesNum = document.getElementById("ques-num").innerText;

// creating an array and passing the number, questions, options, and answers
let questions = [];

fetch(
  `https://opentdb.com/api.php?amount=${quesNum}&category=${categoryType}&difficulty=${difficultyType}&type=multiple`
)
  .then((res) => {
      return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions)
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
              answer: loadedQuestion.correct_answer,
              category: loadedQuestion.category,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answerNum = Math.floor(Math.random() * 4) + 1;

          answerChoices.splice(
              formattedQuestion.answerNum - 1,
              0,
              loadedQuestion.correct_answer
          );

          

          formattedQuestion.options = [...answerChoices];
          // answerChoices.forEach((choice, index) => {
          //     formattedQuestion['choice' + (index + 1)] = choice;
          // });

          return formattedQuestion;
      });

      
  })
  .catch((err) => {
      console.error(err);
  });

// let questions = [
//     {
//     numb: 1,
//     question: "What does HTML stand for?",
//     answer: "Hyper Text Markup Language",
//     options: [
//       "Hyper Text Preprocessor",
//       "Hyper Text Markup Language",
//       "Hyper Text Multiple Language",
//       "Hyper Tool Multi Language"
//     ]
//   },
//     {
//     numb: 2,
//     question: "What does CSS stand for?",
//     answer: "Cascading Style Sheet",
//     options: [
//       "Common Style Sheet",
//       "Colorful Style Sheet",
//       "Computer Style Sheet",
//       "Cascading Style Sheet"
//     ]
//   },
//     {
//     numb: 3,
//     question: "What does PHP stand for?",
//     answer: "Hypertext Preprocessor",
//     options: [
//       "Hypertext Preprocessor",
//       "Hypertext Programming",
//       "Hypertext Preprogramming",
//       "Hometext Preprocessor"
//     ]
//   },
//     {
//     numb: 4,
//     question: "What does SQL stand for?",
//     answer: "Structured Query Language",
//     options: [
//       "Stylish Question Language",
//       "Stylesheet Query Language",
//       "Statement Question Language",
//       "Structured Query Language"
//     ]
//   },
//     {
//     numb: 5,
//     question: "What does XML stand for?",
//     answer: "eXtensible Markup Language",
//     options: [
//       "eXtensible Markup Language",
//       "eXecutable Multiple Language",
//       "eXTra Multi-Program Language",
//       "eXamine Multiple Language"
//     ]
//   },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
// ];