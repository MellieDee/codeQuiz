

  /* need to work in  2 places:
1) HTML
define score array or at least first list item**

identify the container the initials (ie list item) will be stored
----score-list-container----

a) create the ul (that will sit inside of the container)
setAttribute of Ul ("user-score-id", "highScoreIdCounter")

b)use a function to create li with id=0 then i++ then append to the ul

for (i = 0; i<= arr.length - 1; i++) {
let li = document.createElement("li");

li.innerHTML = arr[i];
li.setAttribute("style", "display: block;");
highScoreUl.appendChild(li);
}

**Define Score array:
let scoreArray = []
capture initials from form
associate them with the score
then push that package to the array




2) Save Scores to localStorage









*/


function createScoreListItemEl() {
//   quizContainer.style.display = "none";
//  gameOverContainer.style.display = "none";
//   scoreListContainer.style.display = "block";

//   let scoreArray = ['a', 'b', 'c'];
//   let highScoreUlContainerDiv = document.getElementById("score-list-container");

//   let highScoreUl = document.createElement("ul");
//   highScoreUl.setAttribute("user-score-id", "highScoreIdCounter")

//   for (i = 0; i<= arr.length - 1; i++) {
//     let li = document.createElement("li");
//     li.innerHTML = arr[i];
//     li.setAttribute("style", "display: block;");
//     highScoreUl.appendChild(li);
//     }
//     highScoreUlContainerDiv.appendChild(highScoreUl);
//     console.log(li);
// }  