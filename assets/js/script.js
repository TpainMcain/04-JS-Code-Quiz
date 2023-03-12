var questions = [
    {
        title: "Javascript is an _______ language?",
        choices: ["Object-oriented", "Object-based", "Procedural", "None of the above"],
        answer: "Object-oriented"
    },
    {
        title: "Arrays in JavaScript are defined by which of the following statements?",
        choices: ["It is an ordered list of values", "It is an ordered list of objects", "It is an ordered list of string", "It is an ordered list of functions"],
        answer: "It is an ordered list of values"
    },
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "Both A and B", "None of the Above"],
        answer: "Both A and B"
    },
    {
        title: "Which of the following is not javascript data types?",
        choices: ["Null type", "Undefined type", "Number type", "All of the above"],
        answer: "All of the mentioned"
    },
    {
        title: "Which of the following can be used to call a JavaScript Code Snippet?",
        choices: ["Function/Method", "Preprocessor", "Triggering Event", "RMI"],
        answer: "Function/Method"
    },
    {
        title: "Which of the following function of Array object joins all elements of an array into a string?",
        choices: ["concat()", "join()", "pop()", "map()"],
        answer: "join()"
    }];
// Declare variables for html elements. Start screen:
var viewHSBtn = document.querySelector("#viewHS");
var timerEl = document.querySelector("#timer");
var startScreenEl = document.querySelector("#startScreen");
var startTestBtn = document.querySelector("#startTest");
// Quiz questions and answers screen:
var testEl = document.querySelector("#test");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
// Submitting scores screen:
var submitScores = document.querySelector("#submitScores");
var userScoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtn = document.querySelector("#submitInitials");
// Highscores screen:
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtn = document.querySelector("#goBack");
var resetScoresBtn = document.querySelector("#resetScores");
// Universal variables:
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

// Create function for starting and updating timer.
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }}, 1000);} 
// Create function for stopping the timer.
function stopTimer() {
    clearInterval(interval);} 
// Create function that will hide current questions and display the next one. Display sumbit score screen if last question. 
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(testEl);
        show(submitScores);
        timerEl.textContent = 0;}} 
// Create function to check user answer and update score. 
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
        displayMessage("That's right!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Incorrect.");}}
// Create function to display correct/incorrect message for two seconds. 
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".jumbotron").appendChild(messageHr);
    document.querySelector(".jumbotron").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);}
// Create functions to hide and show html elements.
function hide(element) {
    element.style.display = "none";}
function show(element) {
    element.style.display = "block";}
// Create function to reset variables.
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;}
// Creates function to render the current question.
function renderQuestion() {
    questionsEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }}
// Creates function to render highscores pulled from local storage.
function renderHighScores() {
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);}}

// Adds event listener to View Highscores button to display high scores.
viewHSBtn.addEventListener("click", function () {
    hide(startScreenEl);
    hide(testEl);
    hide(submitScores);
    renderHighScores();
    stopTimer();
    reset();});
// Adds event listner to Start button to begin the test and start timer.
startTestBtn.addEventListener("click", function () {
    hide(startScreenEl);
    startTimer();
    renderQuestion();
    show(testEl);});
// Adds event listener when clicking on an answer
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();}});
// Adds event listener to Submit button that pushes stored values to local storage. Initilizes function to show High Score screen.
submitInitialsBtn.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(submitScores);
        renderHighScores();
        reset();}});
// Adds event listener to Back button that returns user to start screen.
goBackBtn.addEventListener("click", function () {
    hide(highScoresEl);
    show(startScreenEl);});
// Adds event lisenter to Reset Scores button that resets high scores.
resetScoresBtn.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();});