const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
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
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button );
    });

    document.getElementById('next-button').classList.add('hidden');
}

function selectAnswer(index) {
    const question = questions[currentQuestionIndex];
    if (index === question.correct) {
        score++;
    }
    document.getElementById('next-button').classList.remove('hidden');
    const answers = document.querySelectorAll('.answer');
    answers.forEach((button, i) => {
        button.disabled = true;
        if (i === question.correct) {
            button.style.backgroundColor = '#28a745'; // Green for correct answer
        } else {
            button.style.backgroundColor = '#dc3545'; // Red for incorrect answer
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('question-page').classList.add('hidden');
    document.getElementById('end-page').classList.remove('hidden');
    document.getElementById('score').innerText = score + '/' + questions.length;
}

function restartQuiz() {
    document.getElementById('end-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
}
