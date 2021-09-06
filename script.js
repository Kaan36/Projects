let questions = [
    {
        "question": "1. Wie groß ist die Summe der Winkel eines Dreiecks?",
        "answer_1": "45 Grad",
        "answer_2": "90 Grad",
        "answer_3": "180 Grad",
        "answer_4": "360 Grad",
        "right_answer": 3
    },
    {
        "question": "2. Wie wird die Zahl unter dem Bruchstrich bezeichnet?",
        "answer_1": "Nenner",
        "answer_2": "Quotient",
        "answer_3": "Zähler",
        "answer_4": "Teiler",
        "right_answer": 1
    },
    {
        "question": "3. Wie beginnt die Kreiszahl Pi (π)?",
        "answer_1": "3,1415",
        "answer_2": "2,8485",
        "answer_3": "1,3435",
        "answer_4": "4,6465",
        "right_answer": 1
    },
    {
        "question": "4. Welche Formel berechnet den Kreisumfang?",
        "answer_1": "a² + b²",
        "answer_2": "π mal r²",
        "answer_3": "2 mal π mal",
        "answer_4": "π geteilt durch r mal 2",
        "right_answer": 3
    },
    {
        "question": "5. Was ist eine Primzahl?",
        "answer_1": "Eine Zahl, die mehr als 5 Teiler hat.",
        "answer_2": "Eine Zahl, die keine Teiler hat.",
        "answer_3": "Eine Zahl, die nur durch ungerade Zahlen teilbar ist.",
        "answer_4": "Eine Zahl, die nur durch 1 und sich selbst teilbar ist.",
        "right_answer": 4
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('sound/start.mp3');
let AUDIO_FAIL = new Audio('sound/end.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('header-image').src = "img/trophy.png";
}

function updateToNextQuestion() {

    let question = questions[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion]; // lade JSON Array auf variable
    let selectedQuestionNumber = selection.slice(-1); // letzter Buchstabe von selection selektieren
    let idOfRightAnswer = `answer_${question['right_answer']}`; // Lösung vom Array in Variable laden

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++; // z.B von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    console.log('Fortschritt:', percent);
    document.getElementById('progressBar').style = `width: ${percent}%`;
    document.getElementById('progressBar').innerHTML = percent + '%';
}

function restartGame() {
    document.getElementById('header-image').src = "img/pencil.jpg";
    document.getElementById('endScreen').style = 'display: none;'; // Endscreen ausblenden
    document.getElementById('questionBody').style = ''; // questionBody wieder anzeigen
    currentQuestion = 0;
    rightQuestions = 0;
    init();
}