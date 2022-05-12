
// Detect clicks on the button
if (btn) {
    btn.onclick = function() {
        // The JS works in conjunction with the 'dipped' code in style.css
        btn.classList.toggle("dipped");
        // selectAnswer(btn);
    };
}

// extremely jank question storage
const questions = [
    {
        question: "day 1",
        answers: [
            {text: "a", correct: true},
            {text: "b", correct: false},
            {text: "c", correct: false},
            {text: "d", correct: false},
        ]
    },

    {
        question: "day 2",
        answers: [
            {text: "a", correct: false},
            {text: "b", correct: false},
            {text: "c", correct: true},
            {text: "d", correct: false},
        ]
    },

    {
        question: "day 3",
        answers: [
            {text: "a", correct: false},
            {text: "b", correct: false},
            {text: "c", correct: false},
            {text: "d", correct: true},
        ]
    }
]

// makes the current day's question
function loadQuestion() {

    // fetch the current day's question
    console.log("Loading question");
    let questionIndex = Math.floor((new Date().getTime() - startTime)/86400000); // calculate number of days since start of Techstardle
    const currentQuestion = questions[questionIndex];
    question.innerText = currentQuestion.question;

    // wipe answer buttons
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

    // create new answer buttons
    currentQuestion.answers.forEach(ans => {
        const button = document.createElement('button');
        button.innerText = ans.text;
        button.classList.add('btn');
        if (ans.correct) button.dataset.correct = ans.correct;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })

}

// one of the answers were clicked
function selectAnswer(e) {

    console.log("selected a thing");

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    // show answers
    if (correct) {
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct)
                button.classList.add('correct');
        });
    }

    // disable clicks
    Array.from(answerButtons.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });

}

function show_help() {
    alert("Welcome to TechStardle!\n" +
        "On a daily basis, we have a new trivia question for our TechStar Interns.\n" +
        "You only have on guess, make it count.\n" +
        "Come back everyday to test your UKG knowledge and keep your streak!");
}

function show_stats() {
    alert("Statistics!\n" +
        "Played: \n" +
        "Win %: \n" +
        "Current Streak: \n" +
        "Max Streak: \n")
}

function show_options() {
    let name = prompt("To be considered on the leaderboard, we have to know who you are.\n" +
        "What is your name?")
}





loadQuestion();
// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/