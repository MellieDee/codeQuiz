//   DEFINE VARIABLE/CONSTANTS

const quizContainer = document.getElementById("quiz-container");

const questionContainer = document.getElementById("questions");

const answerContainer = document.getElementById("answers");

const answerA = document.getElementById("a");
const answerB = document.getElementById("b");
const answerC = document.getElementById("c");
const answerD = document.getElementById("d");



//START BUTTON VAR

var startBtn = document.getElementById("start");

 //  Add event listener to start the quiz 
 //if the button was clicked 
 //then start the TimeR and display the first question
 startBtn.addEventListener("click", startQuiz);





 var startQuiz =  function (){
    startBtn.style.display = "none";
    //need timer to start = 0
    //need timer to countdown every 1 sec
    quizContainer.style.display = "block";
  
  };



  //TO  CREATE HIGH SCORE LIST
  