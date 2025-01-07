const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const nameInput = document.getElementById('name-input'); // New input for name

let currentQuestionIndex = 0;
let score = 0;
let userName = ''; // Variable to store the user's name

const questions = [
    // ... (your existing questions)
];

startButton.addEventListener('click', () => {
    userName = nameInput.value.trim(); // Capture the user's name
    if (userName === '') {
        alert('Please enter your name to start the quiz.'); // Alert if name is empty
        return;
    }
    transitionTo(quizPage);
    loadQuestion();
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    nextButton.classList.add('hidden'); // Hide the next button initially

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index, button));
        answersElement.appendChild(button);
    });

    // Update the next button text based on the current question index
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "See Results";
    } else {
        nextButton.textContent = "Next Question";
    }
}

function checkAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answersElement.querySelectorAll('button');

    // Disable all answer buttons after selection
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }

    // Show feedback for the selected answer
    buttons.forEach((btn, index) => {
        if (index === currentQuestion.correct) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
    });

    // Show the next button
    nextButton.classList.remove('hidden');
}

function showResults() {
    scoreElement.textContent = `${userName}, your score is: ${score}`; // Display user's name in results
    transitionTo(resultPage);
}

function transitionTo(page) {
    const pages = [startPage, quizPage, resultPage];
    pages.forEach(p => {
        if (p === page) {
            p.classList.remove('hidden');
            p.classList.add('visible');
        } else {
            p.classList.remove('visible');
            p.classList.add('hidden');
        }
    });
}

// Restart the quiz
document.getElementById('restart-button').addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    nameInput.value = ''; // Clear the name input
    transitionTo(startPage);
});
