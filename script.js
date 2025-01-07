const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the capital of Spain?",
        answers: ["Lisbon", "Madrid", "Barcelona", "Seville"],
        correct: 1
    }
];

startButton.addEventListener('click', () => {
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
    scoreElement.textContent = score;
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
    transitionTo(startPage);
});
