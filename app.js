const btn = document.querySelector("button"); // Get the button from the page
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startTime = 1652328000000; // May 12th timestamp


// Detect clicks on the button
if (btn) {
  btn.onclick = function () {
    // The JS works in conjunction with the 'dipped' code in style.css
    btn.classList.toggle("dipped");
    // selectAnswer(btn);
  };
}

// extremely jank question storage
const questions = [
    {
        "question": "What year did UKG form in?",
	"answers": [{"text": "1996", "correct": false}, 
		{"text": "2004", "correct": false}, 
		{"text": "2019", "correct": false},
		{"text": "2020", "correct": true}]
    },
    {
	"question": "Which team does UKG sponsor?",
	"answers": [{"text": "Miami Marlins", "correct": false}, 
		{"text": "Miami Heat", "correct": true}, 
		{"text": "Florida Panthers", "correct": false},
		{"text": "Miami Dolphins", "correct": false}]
    },
    {
        "question":"In what UKG competition do participants share creative ideas?",
	"answers": [{"text": "Insert fake answer", "correct": false}, 
		{"text": "Spark Tank", "correct": true}, 
		{"text": "Idk", "correct": false},
		{"text": "Hello", "correct": false}]
    }
];

// makes the current day's question
function loadQuestion() {
  // fetch the current day's question
  console.log("Loading question");
  let questionIndex = Math.floor((new Date().getTime() - startTime) / 86400000); // calculate number of days since start of Techstardle
  const currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;

  // wipe answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  // create new answer buttons
  currentQuestion.answers.forEach((ans) => {
    const button = document.createElement("button");
    button.innerText = ans.text;
    button.classList.add("btn");
    if (ans.correct) button.dataset.correct = ans.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
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
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct) button.classList.add("correct");
    });
  }

  // disable clicks
  Array.from(answerButtons.children).forEach((button) => {
    button.removeEventListener("click", selectAnswer);
  });
}

loadQuestion();
// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/
