document.addEventListener("DOMContentLoaded", function () {
  const startWindow = document.getElementById("start-window");
  const gameWindow = document.getElementById("game-window");
  const startBtn = document.getElementById("start-btn");

  const input = document.getElementById("name-input");
  let userName = "";
  let gameActive = false;
  let wrongAnswer = "";
  let correctAnswer = "";
  let optionTrue = "";
  let optionFalse = "";
  let currentQuestion = 0;

  let score = 0;

  let question = document.getElementById("question");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");

  const url = "./assets/quizQuestions.json";

  async function getQuestions() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }
      const data = await response.json();
      showQuestion(data.results);
      // console.log(data);
    } catch (error) {
      console.log(error, "error");
    }
  }

  getQuestions();

  function showQuestion(data) {
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].question);
      if (i === currentQuestion) {
        question.innerHTML = data[i].question;

        wrongAnswer = data[i].incorrect_answer;

        correctAnswer = data[i].correct_answer;

        if (wrongAnswer === "True") {
          optionTrue = wrongAnswer;
        } else if (correctAnswer === "True") {
          optionTrue = correctAnswer;
        }

        if (wrongAnswer === "False") {
          optionFalse = wrongAnswer;
        } else if (correctAnswer === "False") {
          optionFalse = correctAnswer;
        }

        option1.innerText = optionTrue;
        option2.innerText = optionFalse;
      }
    }
  }

  option1.addEventListener("click", function () {
    //console.log("click");

    if (optionTrue === correctAnswer) {
      score++;
      console.log("Correct");
    } else if (optionTrue === wrongAnswer) {
      console.log("Wrong");
    }
    currentQuestion++;
    getQuestions();
  });

  option2.addEventListener("click", function () {
    if (optionFalse === correctAnswer) {
      score++;
      console.log("Correct");
    } else if (optionFalse === wrongAnswer) {
      console.log("Wrong");
    }
    currentQuestion++;
    getQuestions();
  });
});
