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
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

function showFeedback(isCorrect) {
    const buttons = answersElement.querySelectorAll('button');
    buttons.forEach((button, index) => {
        if (index === questions[currentQuestionIndex].correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
    });
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
