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
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Ag", "Pb", "Fe"],
        correct: 0
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "Japan", "Thailand", "South Korea"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Tomato", "Avocado", "Pepper", "Onion"],
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
            p.classList.remove ('visible');
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
