
var darkModIcon = document.querySelector("#dark");
var lightModIcon = document.querySelector("#light");
var darkTheme = document.querySelector("body");
var buttons = document.querySelectorAll(".circle").length;
var headText2 = document.querySelector("h2");
var simonColors = ["red","green","yellow","blue"];
var gameSection = []; // game colours store
var userSection = []; // user colours store
var gameStart = false; // 1 gameStart is false, 2 gameStart is true
var score = 0;

// game start button
document.querySelector(".Start").addEventListener("click",function(){
  if (!gameStart) { // gameStart is true
    document.querySelector(".levels").textContent = "Level:" + score;
    comparing();
    gameStart = true; // gameStart is true
    var gameSounds = new Audio("sounds/game-start.mp3"); // game start button sound
    gameSounds.play();
  }
});
//  game restart function
function restart() {
  gameSection = []; // game section array 0
  userSection = []; // user section array 0
  gameStart = false;
  score = 0;
}
// button clicked colours
for (var i = 0; i < buttons; i++) { // add for loop for click all buttons
 document.querySelectorAll(".circle")[i].addEventListener("click",function(){
   userSection.push(this.id); // user clicked colours
   comparing(userSection.length-1); // get position of colours
   buttonClickEfect(this.id); // user clicked colour id as a input
   soundEffects(this.id); // add sound effects in button clicks
 });
}

// comparing two colours
function comparing(colours){
  // game color = user color
  if (gameSection[colours] === userSection[colours]) {
    if (gameSection.length === userSection.length) { // game color position user color position
      setTimeout(function(){
        randomSimonColor(); // next color generate
      },1000);
    }
  }
  else {
    headText2.style.fontSize = "10px";
    headText2.innerHTML = "Current Score: " + localStorage.getItem("oldScore"); // store current level score in localStorage
    var gameSounds = new Audio("sounds/wrong.mp3"); // wrong sound effects
    gameSounds.play();
    document.querySelector("body").classList.add("wrong");
    setTimeout(function () {
      document.querySelector("body").classList.remove("wrong");
    },200);
    // game over and restart button text content
    document.querySelector(".Start").textContent = "Restart";
    document.querySelector(".levels").textContent = "Game Over!";
    restart();
  }
}
// random colours sequencce
function randomSimonColor(){
  userSection = [];
 var randomNumbers = Math.floor(Math.random()*4);
 var randomColours = simonColors[randomNumbers];
 gameSection.push(randomColours); // game generate colours
 document.querySelector(".levels").textContent = "Level:" + score; // scores
 document.querySelector(".Start").textContent = "Start"; // start text in button
 score ++; // game score increase
 buttonClickEfect(randomColours); // button animations
 soundEffects(randomColours); // button sound effects
 var currentScore = score;
 localStorage.setItem("oldScore", currentScore);
 // higher scores textContent
 if (score === 50) {
  headText2.style.fontSize = ".6rem";
  headText2.style.color = "#ff1a1a";
  headText2.innerHTML = "New Higher Score.";
  var gameSounds = new Audio("sounds/level-1.mp3"); // higher score sound effects
  gameSounds.play();
 }
 else if (score === 100) {
   headText2.style.fontSize = ".6rem";
   headText2.style.color = "#009900";
   headText2.innerHTML = "New Higher Score.";
   var gameSounds = new Audio("sounds/level-2.mp3"); // higher score sound effects
   gameSounds.play();
 }
 else if (score === 150) {
   headText2.style.fontSize = ".6rem";
   headText2.style.color = "#0080ff";
   headText2.innerHTML = "New Higher Score.";
   var gameSounds = new Audio("sounds/level-3.mp3"); // higher score sound effects
   gameSounds.play();
 }
 else if (score === 200) {
   headText2.style.fontSize = ".6rem";
   headText2.style.color = "#ffff1a";
   headText2.innerHTML = "New Higher Score.";
   var gameSounds = new Audio("sounds/level-4.mp3"); // higher score sound effects
   gameSounds.play();
 }
 else {
   headText2.style.fontSize = "1.5rem";
   headText2.innerHTML = "Simon";
   headText2.style.color = "#fff";
 }
}
//  button animations
function buttonClickEfect(clickedId) {
      document.querySelector("#" + clickedId).classList.add(clickedId);
  setTimeout(function (){
      document.querySelector("#" + clickedId).classList.remove(clickedId);
  }, 400);

}
// sound effects
function soundEffects(effects){
  var gameSounds = new Audio("sounds/" + effects + ".mp3");
gameSounds.play();
}

// localStorage stored values
var darkS = localStorage.getItem("darkS");
var dark = localStorage.getItem("dark");
// add dark mode on loading page
if (dark === "true") { // localStorage value is true
  darkTheme.classList.add(darkS);
  // light icon show
  lightModIcon.style.display ="block";
  darkModIcon.style.display = "none";
}
// dark mode click event function
document.querySelector(".dark-button").addEventListener("click", function(){
// localStorage set values
localStorage.setItem("dark",darkTheme.classList.toggle("dark-mode")); // togglr values true/false
localStorage.setItem("darkS",darkTheme.classList.value); // class name "dark-mode"
// dark mode icon show hide condition
 if (localStorage.getItem("dark") === "true") { // localStorage value is true
     lightModIcon.style.display ="block";
     darkModIcon.style.display = "none";
 }
 else {
   lightModIcon.style.display ="none";
   darkModIcon.style.display = "block";
 }
});
