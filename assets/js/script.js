/*  ---------------- DEFINE GLOBAL VARIABLES-------------*/
let startBtn = document.getElementById("start");
let saveInitialsBtn = document.getElementById("save-initials")

let welcomeContainer = document.getElementById("welcome-container");
let quizContainer = document.getElementById("quiz-container");
let answerContainer = document.getElementById("answer-container");
let gameOverContainer = document.getElementById("game-over-container");
let scoreListContainer = document.getElementById("score-list-container");

let question = document.getElementById("question");
let answerA = document.getElementById("a");
let answerB = document.getElementById("b");
let answerC = document.getElementById("c");
let answerD = document.getElementById("d");
let result = document.getElementById("result");


let highScoresUl = document.getElementById("high-scores");


/*------------ Question Array (partial)  --------------*/
var userScore = 0;

let questionArray = [
  {
    question: "What does CDN stand for?",
    answerA: "Customer Data Network",
    answerB: "Consumer Delivery Network",
    answerC: "Content Delivery Network",
    answerD: "Content Data Network",
    correct: "c"
  },

  {
    question: "What is bubbling?",
    answerA: "Soda",
    answerB: "Event from children up through parents, grandparents, to infinity and beyond",
    answerC: "Michael Bubly",
    answerD: "Event from parents down through kids",
    correct: "b"
  },

  {
    question: "Dif between for  & While loops?",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    correct: "a"
  }
];


/*--------------   Event Management Starts  -----------*/
startBtn.addEventListener("click", startQuiz);
answerA.addEventListener("click", review);
answerB.addEventListener("click", review);
answerC.addEventListener("click", review);
answerD.addEventListener("click", review);
// saveInitialsBtn.addEventListener("click", scoreFormHandler);

/*--------------   Event Management Ends  -------------*/




/*------------------FUNCTIONS START-----------------*/

//  ***------   Start Quiz Function Starts   ----- ***  
function startQuiz() {
  welcomeContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  // countdown()
};
//   ***----Start Quiz Function Ends   ----****


//  ***----   Display Questions Function Starts  ---- ***  
// Define Array Iteration Components
var lastQ = questionArray.length - 1;
var currentQIndex = 0

function displayQuestion() {
  //questionArray is name of defined []
  var q = questionArray[currentQIndex];
  //what gets created as the 'new' dynamic HTML is the p-tag question text, which is created by identifying at what index# in the array the question is  at the current time (ie 'q' var above) Same for answers

  question.innerText = q.question;
  answerA.textContent = q.answerA;
  answerB.textContent = q.answerB;
  answerC.textContent = q.answerC;
  answerD.textContent = q.answerD;
}
//  ***----   Display Questions Function Ends  ------***  


//  ***-------  Timer Function Starts  --------***  
// Timer that counts down from 5
let timerEl = document.getElementById("timer");
let timerEndEl = document.getElementById("timer-end");
let timeLeft = 120;

function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      console.log("timer");
    }
  }, 1000);
}
countdown()
//  ***-------  Timer Function Ends  --------***  



//  ***-------  Review Answer Function Starts  --------***  
function review() {
  //get the id from the button that the user clicked
  var userChoice = this.getAttribute("id")
  console.log(userChoice);
  if (userChoice === questionArray[currentQIndex].correct) {
    userScore++
    result.innerText = "Yes!"
    console.log(timeLeft);
    console.log(userScore)

  } else {
    console.log(timeLeft);
    result.innerText = "Oops! That's not it!";
    timeLeft = timeLeft - 5;
    console.log(timeLeft);
    console.log(userScore)
  }

  if (currentQIndex < questionArray.length - 1) {
    currentQIndex++
    displayQuestion()

  } else {
    console.log("game over")
    console.log(timeLeft);
    console.log(userScore * 10)
    resultsDisplay()
  }
}
//  ***-------  Review Answer Function Ends  --------*** 


// ***-------  Results Display Function Starts  --------***  
function resultsDisplay() {
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  timerEndEl.textContent = userScore * 10 + timeLeft
  console.log(timerEndEl.textContent);
};
// ***-------  Results Display Function Ends  --------*** 


//  ***-------  High Score Function Starts  --------*** 
// to create high score list
var highScoreIdCounter = 0;
var scoreFormEl = document.getElementById("score-form");
var highScoreListEl = document.getElementById("high-scores")
var scoresArray = [];


//   ***-------- Score Handler Function Starts   -------*** 
function scoreFormHandler(event) {
  event.preventDefault();
  //get the actual typed-in letters
  let userInitials = document.querySelector("input[name='user-initials']").value;
  console.log(userInitials)

  //var userScoreInput = result of TimeRanges()

  //   if (userScoreInput > 0) {

  //check to see if the values are empty strings
  if (userInitials === "") {
    alert("I thought you wanted to save your progress?");
    return false;

    //  //reset form fields
    // // document.querySelector("input[name='user-initials']").value = "";
  } else {
    //package data as object to save in localStorage
    var userNameObj = {
      name: userInitials,
      score: timerEndEl.textContent
    };
    console.log(userNameObj);
    createListItemInfoEl(userNameObj);

    //    } } else {
    //          //   confirm("Oops. Would you like to try again?");     // }   };
    //  }
  };


  //   ***------   createListNameEl Function  -----****
  //make the list in HTML

  function createListItemInfoEl() {
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "none";
    scoreListContainer.style.display = "block";

    var listItemEl = document.createElement("li");
    listItemEl.className = "score-item";

    //assign unique ID to each score as custom attribute
    listItemEl.setAttribute("score-item-id", highScoreIdCounter);

    //create a div to store the name and score in
    var scoreInfoEl = document.createElement("div");
    //div has a class name of
    scoreInfoEl.className = "score-info";

    //add HTML/display content to the div
    scoreInfoEl.innerHTML = "<h3 class='h4 text-left'>PlayersScoreWill go here</h3>";
    //add score info to the li item
    listItemEl.appendChild(scoreInfoEl);

    //add list item to the ul
    highScoresUl.appendChild(listItemEl);
    // console.log(listItemEl);
  };

  //add highScoreIdCounter as value to userNameObj
  //     userNameObj.id = highScoreIdCounter;
  //push entire new obj to the score array
  scoresArray.push(userNameObj);
  console.log(scoresArray);

  saveScores();

  //increase score counter for next high score
  highScoreIdCounter++;

};

//add score in viewport 
scoreFormEl.addEventListener("save-initials", scoreFormHandler);
// }

//   ***-----Save Scores in local storage Function    ------****
function saveScores() {
  localStorage.setItem("scoresArr", JSON.stringify(scoresArray));
};


//   ***-----LOAD Scores from local storage Function    ------****
function loadScores() {
  //Gets scores from localStorage & //Converts  from the string format back into an array of objects. Send 1 at a time thru 
  var savedScores = localStorage.getItem("scoresArray");

  //Iterates through a array and creates elements on the page from it.
  {
    if (!savedScores) {
      scoresArray = [];
      return false;
    };
    savedScores = JSON.parse(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
    //pass ea  score obj into createListItemInfoEl()
    createListItemInfoEl(savedScores[i]);
   };
  };
}
