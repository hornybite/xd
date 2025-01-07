const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const userNameElement = document.getElementById('user-name');
const nameInput = document.getElementById('name-input');

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
    const userName = nameInput.value.trim();
    if (userName) {
        userNameElement.textContent = `Name: ${userName}`; // Display the user's name
        transitionTo(quizPage);
        loadQuestion();
    } else {
        alert("Please enter your name to start the quiz.");
    }
});

 nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        transitionTo(resultPage);
        scoreElement.textContent = score; // Display the score on the results page
    }
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = ''; // Clear previous answers
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
    }
    nextButton.classList.remove('hidden'); // Show the next button
}

function transitionTo(page) {
    startPage.classList.add('hidden');
    quizPage.classList.add('hidden');
    resultPage.classList.add('hidden');
    page.classList.remove('hidden');
}

// Restart the quiz
document.getElementById('restart-button').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    nameInput.value = ''; // Clear the name input
    userNameElement.textContent = ''; // Clear the displayed name
    transitionTo(startPage);
});
