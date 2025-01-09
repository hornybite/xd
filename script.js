const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('restart-button').addEventListener('click', restartQuiz);

function startQuiz() {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('question-page').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('div');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener ('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    document.getElementById('next-button').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-button').classList.add('hidden');
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('question-page').classList.add('hidden');
    document.getElementById('end-page').classList.remove('hidden');
    document.getElementById('score').innerText = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('end-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}
