/*  ---------DEFINE GLOBAL VARIABLES-------------*/
//   *** Buttons ***
let startBtn = document.getElementById("start");
let saveInitialsBtn = document.getElementById("save-initials")
let highScoreBtn = document.getElementById("high-score-btn");
let clearScoresBtn = document.getElementById("clear-scores");
let startAgainBtn = document.getElementById("start-again");

//   *** Display Containers ***
let welcomeContainer = document.getElementById("welcome-container");
let quizContainer = document.getElementById("quiz-container");
let answerContainer = document.getElementById("answer-container");
let gameOverContainer = document.getElementById("game-over-container");
let scoreListContainer = document.getElementById("score-list-container");

//   *** Question Related ***
let question = document.getElementById("question");
let answerA = document.getElementById("a");
let answerB = document.getElementById("b");
let answerC = document.getElementById("c");
let answerD = document.getElementById("d");
let result = document.getElementById("result");
let highScoresOl = document.getElementById("high-scores");

let currentQIndex = 0;

//   *** Timer related ***
let timerEl = document.getElementById("timer");
let timerEndEl = document.getElementById("timer-end");
let timeLeft = 120;
timerEl.textContent = timeLeft + ' seconds remaining';
let timeInterval;

//   *** Score Related ***
let form = document.getElementById("score-form");
let scoreList = document.getElementById("score-list");
let li = document.createElement("li");


/*------------ Question Array Starts  --------------*/
let userScore = 0;

let questionArray = [
  {
    question: "What does CDN stand for?",
    answerA: "Customer Data Network",
    answerB: "Consumer Delivery Network",
    answerC: "Content Delivery Network",
    answerD: "Content Data Network",

    correct: "Content Delivery Network"
  },

  {
    question: "What is bubbling?",
    answerA: "Identifying an element that was targeted.",
    answerB: "Event handled on a child element then up through its parent then through preceding ancestor elements.",
    answerC: "Michael Bubl\u00E9 singing about tiny bubbles in his wine.",
    answerD: "Event handled on a parent element then down through children elements.",

    correct: "Event handled on a child element then up through its parent then through preceding ancestor elements."
  },

  {
    question: "Regarding forEach loops, which statement is true?",
    answerA: "You use a temporary 'i' variable to access the array.",
    answerB: "forEach loop does not iterate over each item in the array.",
    answerC: "You are directly calling on the Array.prototype method in relation to the array, which lowers risk of accidental errors.",
    answerD: "You can use an 'if' statement to check criteria, then break out of the loop early.",

    correct: "You are directly calling on the Array.prototype method in relation to the array, which lowers risk of accidental errors."
  },

  {
    question: "What is the purpose of 'return' in JavaScript?",
    answerA: "To start the execution of a function.",
    answerB: "To 'jump out' of a function.",
    answerC: "To 'jump out' of a switch() statement.",
    answerD: "To stop the execution of a function, and return a value from that function.",

    correct: "To stop the execution of a function, and return a value from that function."
  },

  {
    question: "What is the purpose of a switch() statement?",
    answerA: "To repeat same actions based on different conditions.",
    answerB: "To perform different actions based on different conditions.",
    answerC: "To loop through a block of code while a specified condition is true.",
    answerD: "To drink decaf instead of regular.",

    correct: "To perform different actions based on different conditions."
  }
];
/*------------ Question Array Starts  --------------*/


/*--------------   Event Management Starts  -----------*/
document.querySelectorAll(".choiceBtn").forEach((choiceBtn) => {
  choiceBtn.addEventListener("click", grade);
});

startBtn.addEventListener("click", startQuiz);
saveInitialsBtn.addEventListener("click", addingScore);
clearScoresBtn.addEventListener("click", clearScores);
highScoreBtn.addEventListener("click", loadScores);
startAgainBtn.addEventListener("click", startQuizAgain);
/*--------------   Event Management Ends  --------------*/


/*------------------FUNCTIONS START---------------------*/

/*---   Decrement Timer Function Starts   ---*/
//PURPOSE: to account for timer text display delay in relation to question display
function decrementTimer() {
    // timeLeft--;
  if (timeLeft > 1) {
     timeLeft--;
    // Set the `textContent` of `timerEl` to show the remaining seconds
    timerEl.textContent = timeLeft + ' seconds remaining';
    // Decrement `timeLeft` by 1
    // timeLeft--;
  } else if (timeLeft === 1) {
    // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
    timerEl.textContent = timeLeft + ' second remaining';
    timeLeft--;
  } else {
    // Once `timeLeft` gets to 0, set `timerEl` to empty string; display next screen - Game Over
    timerEl.textContent = "";
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    timerEndEl.textContent = userScore * 10  + timeLeft
 
    // Use `clearInterval()` to stop the timer
    clearInterval(timeInterval);
  }
}
/*---   Decrement Timer Function Ends   ---*/


/*---   Countdown Function Starts   ---*/
function countdown() {
  // decrementTimer();
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(decrementTimer, 1000);
}
// countdown()
/*-------  Countdown Function Ends  --------*/  


/*--------   Start Quiz Function Starts   ------- */  
function startQuiz() {
  welcomeContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  countdown();
};
/*------   Start Quiz Function Ends   -------*/


/*-------   Display Question Function Starts  -----*/  
function displayQuestion() {
  //questionArray is name of defined []
  let q = questionArray[currentQIndex];
  //what gets created as the 'new' dynamic HTML is the p-tag question text, which is created by identifying at what index# in the array the question is  at the current time (ie 'q' let above) Same for answers

  question.innerText = q.question;
  answerA.textContent = q.answerA;
  answerB.textContent = q.answerB;
  answerC.textContent = q.answerC;
  answerD.textContent = q.answerD;
}
/*------   Display Question Function Ends  --------*/ 


// -------  Grade Answer Function Starts  --------***  
function grade(event) {
  clearInterval(timeInterval);
  let userChoice = event.target.textContent;

  if (userChoice === questionArray[currentQIndex].correct) {
    userScore++
    result.innerText = "Yes!"
    console.log(timeLeft);
    console.log(userScore)

  } else {
    console.log(timeLeft);
    result.innerText = "Oops! That's not it!";
    timeLeft -= 5;
    timerEl.textContent = timeLeft + " seconds remaining";
    console.log(timeLeft);
    console.log(userScore)
  }

  setTimeout(function () {
    decrementTimer();
    countdown();
    if (currentQIndex < questionArray.length - 1) {
      currentQIndex++
      displayQuestion()

    } else {
      console.log("game over")
      console.log(timeLeft);
      console.log(userScore * 10)
      resultsDisplay()
    }
    result.innerText = "";
  }, 1500);
}
/*-------  Grade Answer Function Ends  --------*/ 


/*-------  Results Display Function Starts  --------*/
function resultsDisplay() {
  clearInterval(timeInterval);
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  timerEndEl.textContent = userScore * 10 + timeLeft
  console.log(timerEndEl.textContent);
  console.log("results displayed");
};
/*-------  Results Display Function Ends  --------*/ 


/*--------   Adding Score Function Starts   ---------*/ 
let scoresArray = [];

function addingScore(event) {
  event.preventDefault();
  //get the actual typed-in letters
  let userInitials = document.querySelector("input[name='user-initials']")

  // console.log(userInitials)
  //check if typed UPPERCASE
  let initialsUpper = userInitials.value.toUpperCase();

  //check to see if the values are empty strings
  if (initialsUpper === "") {
    alert("I thought you wanted to save your progress?");
    return false;

  } else {
    scoresArray.push({ initials: initialsUpper, score: timerEndEl.textContent })

    //to sort the order of the scores
    scoresArray = scoresArray.sort(
      (a, b) => {
        if (a.score < b.score) {
          return 1;

        } else {
          return -1;
        }
      }
    )

    highScoresOl.innerHTML = "";

    for (i = 0; i <= scoresArray.length - 1; i++) {
      // let li = document.createElement("li"); defined globally

      li.className = "score-item";
      li.textContent = `${scoresArray[i].initials} at ${scoresArray[i].score}`;
      // console.log(scoresArray[i].initials);

      highScoresOl.appendChild(li);
    }
    console.log(scoresArray);

    saveScores();
    loadScores();
  }
}
/*--------   Adding Score Function Ends   ---------*/ 


/*--------   Save Scores Function Starts   ---------*/ 
function saveScores() {
  localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
};
/*--------   Save Scores Function Starts   ---------*/ 


/*-----LOAD Scores (from local storage) Function Starts   ------*/
function loadScores() {
  //Gets scores from localStorage & //Converts  from the string format back into an array of objects. Send 1 at a time thru 
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  welcomeContainer.style.display = "none";
  scoreListContainer.style.display = "block";

  let savedScores = JSON.parse(localStorage.getItem("scoresArray"));

  if (!savedScores) {
    scoresArray = savedScores;
    return false;
  };
}
/*-----LOAD Scores (from local storage) Function Ends   ------*/


/*-----clearScores Function Starts   ------*/
function clearScores() {
  localStorage.clear();
  scoreList.style.display = "none";
}
/*-----clearScores Function Ends   ------*/


/*------   Start Quiz AGAIN Function Starts   -----*/
function startQuizAgain() {
  clearInterval(timeInterval);
  timeLeft = 120;
  timerEl.textContent = timeLeft + ' seconds remaining';
  welcomeContainer.style.display = "block";
  scoreListContainer.style.display = "none";
  userScore = 0;
  let q = questionArray[currentQIndex = 0];
  displayQuestion();
};
/*----Start Quiz Again Function Ends   -----*/