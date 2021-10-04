const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const activeCategory = localStorage.getItem('activeCategory');
const category = document.getElementById('nameCategory');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
const play = document.getElementById('play');

let questions = [];
let categories = [];
window.onload = () => {


    let allQuestionsForCategory = new XMLHttpRequest();

    allQuestionsForCategory.onreadystatechange = () => {
        if (allQuestionsForCategory.readyState == 4 && allQuestionsForCategory.status == 200) {
            allQuestionsForCategory = JSON.parse(allQuestionsForCategory.responseText);
            allQuestionsForCategory.forEach(element => {
                if (element.categoryId == activeCategory) {
                    questions.push(element);
                }
            });
            let ajaxCategory = new XMLHttpRequest();

            ajaxCategory.onreadystatechange = () => {
                if (ajaxCategory.readyState == 4 && ajaxCategory.status == 200) {
                    ajaxCategory = JSON.parse(ajaxCategory.responseText);
                    ajaxCategory.forEach(element => {
                        categories.push(element);
                    });

                    category.innerHTML = `<h4>Category of the question <h3 class="catName">${categories.find(element => element.id == activeCategory).name}</h3></h4>`;
                    startGame();
                }
            }

            ajaxCategory.open("GET", "http://localhost:8080/api/categories", true);
            ajaxCategory.send();

        }
    }
    allQuestionsForCategory.open("GET", "http://localhost:8080/api/questions", true);
    allQuestionsForCategory.send()
}



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.href = 'end.html';
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
