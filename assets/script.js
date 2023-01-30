// Globally scoped variables
var startQuiz = document.querySelector('.start-quiz');
var timerEl = document.getElementById('timer');
var revealQuestion = document.getElementById('question');
var recordScore = document.getElementById('score');
var hide = document.getElementById('intro');

// Listener for start quiz button
startQuiz.addEventListener('click', function () {
	playGame();
});

// Clears timer
timerEl.textContent = 'Time: ' + '';

// Timer
var timeLeft = 100;
let timeInterval;

// Timer countdown function
function playGame() {
	timeInterval = setInterval(function () {
		if (timeLeft > 0) {
			timerEl.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft <= 0) {
			timerEl.textContent = 'Time: ' + 0; // Time runs out = game over
			gameOver();
		} else {
			timerEl.textContent = 'Time: ' + 0;
			clearInterval(timeInterval);
		}
	}, 1000);

	// hides intro text
	if (hide.style.display === 'none') {
		hide.style.display = 'block';
	} else {
		hide.style.display = 'none';
	}

	// displays first questions
	if (revealQuestion.style.display === 'none') {
		revealQuestion.style.display = 'flex';
	}

	nextQuestion();
}

// Contains quesiton arrays
var questions = [
	{
		questionNum: 'Question 1',
		question: 'Which word means the same as adagio?',
		choice1: 'Lento',
		choice2: 'Legato',
		choice3: 'Poco',
		choice4: 'Ritenuto',
		answer: 'Ritenuto',
	},
	{
		questionNum: 'Question 2',
		question: 'Which of these terms means "getting quicker"?',
		choice1: 'accelertando',
		choice2: 'rallendando',
		choice3: 'accelerando',
		choice4: 'rallentando',
		answer: 'accelerando',
	},
	{
		questionNum: 'Question 3',
		question: 'What does fine mean?',
		choice1: 'Smoothly',
		choice2: 'Happily',
		choice3: 'Dying away',
		choice4: 'End',
		answer: 'End',
	},
	{
		questionNum: 'Question 4',
		question: 'What does cantabile mean?',
		choice1: 'Dying away',
		choice2: 'Loudly',
		choice3: 'Sadly',
		choice4: 'In a singing style',
		answer: 'In a singing style',
	},
];

// Varibales for next question function
var questionTitle = document.getElementById('question-num');
var questionText = document.getElementById('question-text');
var choiceA = document.getElementById('choice-a');
var choiceB = document.getElementById('choice-b');
var choiceC = document.getElementById('choice-c');
var choiceD = document.getElementById('choice-d');
var questionIndex = 0;

// Fills arrays with next question arrays
function nextQuestion() {
	if (questionIndex < questions.length) {
		questionTitle.textContent = questions[questionIndex].questionNum;
		questionText.textContent = questions[questionIndex].question;
		choiceA.textContent = questions[questionIndex].choice1;
		choiceB.textContent = questions[questionIndex].choice2;
		choiceC.textContent = questions[questionIndex].choice3;
		choiceD.textContent = questions[questionIndex].choice4;
	} else {
		// Stops the timer
		finalScore = timeLeft;
		clearInterval(timeInterval);
		gameOver();
	}
}

let finalScore;

// Adds listeners to each button and checkanswer()
choiceA.addEventListener('click', checkAnswer);
choiceB.addEventListener('click', checkAnswer);
choiceC.addEventListener('click', checkAnswer);
choiceD.addEventListener('click', checkAnswer);

// Checks for correct answer and penalizes for wrong answers
// executes nextQuestion() function
function checkAnswer(e) {
	if (questions[questionIndex].answer === e.target.innerHTML) {
		questionIndex++;
		nextQuestion();
	} else {
		timeLeft -= 20;
		questionIndex++;
		nextQuestion();
	}
}

// Hides other info
// Displays the score
function gameOver() {
	hide.style.display = 'none';
	revealQuestion.style.display = 'none';
	timerEl.style.display = 'none';
	recordScore.style.display = 'flex';
	scoreValue.innerText = finalScore;
	renderScores();
}

// scoreboard variables
var initials = document.querySelector('#player-initials');
var scoreForm = document.querySelector('#save-score');
var scoreboard = document.querySelector('#scoreboard');
var scoreValue = document.getElementById('score-value');

var allScores = [];

// Adds scores on a list
function renderScores() {
	scoreboard.innerHTML = '';

	// Render new score
	for (var i = 0; i < allScores.length; i++) {
		var score = allScores[i];
		console.log(score);

		// Creates leaderboard
		var li = document.createElement('li');
		li.textContent = score.initialsText.toUpperCase() + ': ' + score.finalScore;
		li.setAttribute('data-index', i);

		scoreboard.appendChild(li);
	}
}

function init() {
	// Gets scores from local storage
	var storedScores = JSON.parse(localStorage.getItem('allScores'));

	// Updates localstorage
	if (storedScores !== null) {
		allScores = storedScores;
	}
}

// Stingifies localstorage
function storeScores() {
	localStorage.setItem('allScores', JSON.stringify(allScores));
}

// Prints scores
scoreForm.addEventListener('submit', function (event) {
	event.preventDefault();

	var initialsText = initials.value.trim();

	if (initialsText === '') {
		return;
	}

	let currentScore = {
		initialsText,
		finalScore,
	};

	allScores.unshift(currentScore);
	initials.value = '';

	console.log(allScores);

	storeScores();
	renderScores();
});

// Calls the inititial function
init();
