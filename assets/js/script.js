/*  ---------DEFINE GLOBAL letIABLES-------------*/
let startBtn = document.getElementById("start");
let saveInitialsBtn = document.getElementById("save-initials")
//let goBackBtn = document.getElementById("go-back");
let form = document.getElementById("score-form");
let scoreList = document.getElementById("score-list");



let welcomeContainer = document.getElementById("welcome-container");
let quizContainer = document.getElementById("quiz-container");
let answerContainer = document.getElementById("answer-container");
let gameOverContainer = document.getElementById("game-over-container");
let scoreListContainer = document.getElementById("score-list-container");
let highScoreBtn = document.getElementById("high-score-btn");
let clearScoresBtn = document.getElementById("clear-scores");
let startAgainBtn = document.getElementById("start-again");



let timerEl = document.getElementById("timer");
let timerEndEl = document.getElementById("timer-end");

let question = document.getElementById("question");
let answerA = document.getElementById("a");
let answerB = document.getElementById("b");
let answerC = document.getElementById("c");
let answerD = document.getElementById("d");
let result = document.getElementById("result");
let highScoresOl = document.getElementById("high-scores");

let currentQIndex = 0



/*------------ Question Array (partial)  --------------*/
let userScore = 0;

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
saveInitialsBtn.addEventListener("click", addingScore);
clearScoresBtn.addEventListener("click", clearScores);
highScoreBtn.addEventListener("click", loadScores);
startAgainBtn.addEventListener("click", startQuizAgain);

/*--------------   Event Management Ends  --------------*/





/*------------------FUNCTIONS START---------------------*/
//  ***-------  Timer Countdown Function Starts  --------***  
// let timerEl = document.getElementById("timer");
// let timerEndEl = document.getElementById("timer-end");
let timeLeft = 20;

function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  let timeInterval = setInterval(function () {
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
      timerEl.textContent = "";
      quizContainer.style.display = "none";
      gameOverContainer.style.display = "block";
      timerEndEl.textContent = userScore * 10 + timeLeft
      // form.style.display = "none";

      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      console.log("timer");
    }

  }, 1000);
}
// countdown()
//  ***-------  Timer Function Ends  --------***  


//  ***------   Start Quiz Function Starts   ----- ***  
function startQuiz() {
  welcomeContainer.style.display = "none";
  // goBackContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  countdown()
};
//   ***----Start Quiz Function Ends   ----****


//  ***----   Display Questions Function Starts  ---- ***  
// Define Array Iteration Components


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
//  ***----   Display Questions Function Ends  ------***  


//  ***-------  Review Answer Function Starts  --------***  
function review() {
  //get the id from the button that the user clicked
  let userChoice = this.getAttribute("id")
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
  console.log("results displayed");
};
// ***-------  Results Display Function Ends  --------*** 


//   ***-------- ADDING SCORES TO ARRAY Starts   -------*** 
// let highScoreIdCounter = 0;
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
      let li = document.createElement("li");

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


//   ***-----Save Scores in local storage Function    ------**** 
function saveScores() {
  localStorage.setItem("scoresArray", JSON.stringify(scoresArray));
};


//    ***-----LOAD Scores from local storage Function    ------****
function loadScores() {
  //Gets scores from localStorage & //Converts  from the string format back into an array of objects. Send 1 at a time thru 
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  welcomeContainer.style.display = "none";
  scoreListContainer.style.display = "block";

  let savedScores = JSON.parse(localStorage.getItem("scoresArray"));

  //Iterates through a array and creates elements on the page from it.

  if (!savedScores) {
    scoresArray = savedScores;
    return false;
  };
}


function clearScores() {
  localStorage.clear();
  scoreList.style.display = "none";
}


//  ***------   Start Quiz AGAIN Function Starts   ----- ***  
function startQuizAgain() {
  welcomeContainer.style.display = "block";
  scoreListContainer.style.display = "none";
  timeLeft = 20;
  userScore = 0;
  let q = questionArray[currentQIndex];
  displayQuestion();
};
//   ***----Start Quiz Function Ends   ----****








// //increase score counter for next high score
// highScoreIdCounter++;
//  //add score in viewport 
//  scoreFormEl.addEventListener("save-initials", scoreFormHandler);
//  }
  // let listItemEl = document.createElement("li");
  // listItemEl.className = "score-item";
  // console.log(listItemEl)

  // //assign unique ID to each score as custom attribute
  // listItemEl.setAttribute("score-item-id", highScoreIdCounter);

  // //create a div to store the name and score in
  // let scoreInfoEl = document.createElement("div");
  // //div has a class name of
  // scoreInfoEl.className = "score-info";
  // console.log(scoreInfoEl)




// // // document.querySelector("input[name='user-initials']").value = "";

// //package data as object to save in localStorage
// let userNameObj = {
//   name: userInitials,
//   score: timerEndEl.textContent
// }

// console.log(userNameObj.name);
// console.log(userInitials);


// //add HTML/display content to the div
// userNameObjString = JSON.stringify(userNameObj);
// //savedScores = JSON.parse(savedScores);
// userNameObjString = JSON.parse(userNameObjString);
// console.log(userNameObjString.name);
// console.log(userNameObjString.score);

// createListItemInfoEl(userNameObj);





//   //add HTML/display content to the div
//   userNameObjString = JSON.stringify(userNameObj)
//   //savedScores = JSON.parse(savedScores);
//   userNameObjString = JSON.parse(userNameObjString)
//   console.log(userNameObjString.name);
//   console.log(userNameObjString.score);

//   scoreInfoEl.innerHTML = "<h3 class='h3'>" + userNameObjString.name + ' scored: ' + userNameObjString.score + "</h3>"
//   //add score info to the li item
//   listItemEl.appendChild(scoreInfoEl);

//   // //add highScoreIdCounter value to userNameObj as a property
//   // userNameObj.id = highScoreIdCounter
//   //push to scores array
//   scoresArray.push(userNameObjString);

// //increase score counter for next high score
// highScoreIdCounter++;

// // };
// //  //add score in viewport 
// //  scoreFormEl.addEventListener("save-initials", scoreFormHandler);
// // // // }