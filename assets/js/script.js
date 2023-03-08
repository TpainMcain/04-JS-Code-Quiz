// Declare variables for html elements
// Start screen 
var startScreenEl = document.querySelector("#startScreen");
var startQuizBtn = document.querySelector("#startTest");
// Quiz questions and answers screen
var testEl = document.querySelector("#test");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
// Submitting scores screen
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");
// Highscores screen
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");
// Universal variables
var viewHScoresBtnEl = document.querySelector("#viewHScores");
var timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;