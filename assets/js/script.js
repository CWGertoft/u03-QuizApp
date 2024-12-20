import { saveToLocalStorage } from "./localStorage.js";
import { showLeaderBoard } from "./localStorage.js";

document.addEventListener("DOMContentLoaded", function () {
  const startWindow = document.getElementById("start-window");
  const gameWindow = document.getElementById("game-window");
  const startBtn = document.getElementById("start-btn");
  const input = document.getElementById("name-input");

  const loggedIn = document.getElementById("logged-in");

  let gameActive = false;
  let wrongAnswer = "";
  let correctAnswer = "";
  let optionTrue = "";
  let optionFalse = "";
  let currentQuestion = 0;

  let score = 0;

  let count = 10;
  let countdownInterval;
  let countdown = document.getElementById("countdown");

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
    } catch (error) {
      console.log(error, "error");
    }
  }

  function startGame() {
    gameActive = true;

    if (gameActive === true) {
      startWindow.style.display = "none";
      gameWindow.style.display = "flex";
      loggedIn.style.display = "flex";
      getQuestions();
    }
  }

  startBtn.addEventListener("click", function () {
    let userName = input.value.trim();
    if (userName) {
      localStorage.setItem("userName", userName);
      loggedIn.innerText = `Username: ${userName.toUpperCase()}`;
      startGame();
    } else {
      alert("Please enter your username to start the game.");
    }
    console.log(userName);
  });

  function showQuestion(data) {
    for (let i = 0; i < data.length; i++) {
     
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

    timer();
  }

  option1.addEventListener("click", function () {
   

    if (optionTrue === correctAnswer) {
      score++;
      console.log("Correct");
    } else if (optionTrue === wrongAnswer) {
      console.log("Wrong");
    }

    currentQuestion++;

    if (currentQuestion >= 10) {
      showGameOver();
    } else {
      getQuestions();
    }
  });

  option2.addEventListener("click", function () {
    if (optionFalse === correctAnswer) {
      score++;
      console.log("Correct");
    } else if (optionFalse === wrongAnswer) {
      console.log("Wrong");
    }

    currentQuestion++;

    if (currentQuestion >= 10) {
      showGameOver();
    } else {
      getQuestions();
    }
  });

  function timer() {
    count = 10;

    startCountdown(count);
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      count--;
      startCountdown(count);

      if (count <= 0) {
        clearInterval(countdownInterval);
        currentQuestion++;
        getQuestions();
      }
    }, 1000);

    if (currentQuestion >= 10) {
      showGameOver();
    }
  }

  function startCountdown(time) {
    countdown.textContent = `Time left: ${time}`;
  }

  function showGameOver() {
    gameActive = false;
    clearInterval(countdownInterval);
    
    gameWindow.style.display = "none";
    countdown.style.display = "none";
    loggedIn.style.display = "none";

    localStorage.setItem("mostRecentScore", score);
    document.getElementById(
      "final-score"
    ).textContent = `Your final score is: ${score}`;

    saveToLocalStorage();
    showLeaderBoard();
    document.getElementById("game-over").style.display = "flex";
  }

  function restartGame() {
    score = 0;

  
    currentQuestion = 0;
    gameActive = false;
    document.getElementById("game-over").style.display = "none";
    gameWindow.style.display = "none";
    countdown.style.display = "flex";
    startWindow.style.display = "flex";
    loggedIn.style.display = "none";
    input.value = "";
  }

  document.getElementById("restart-btn").addEventListener("click", function () {
    restartGame();
 
  });

  
  function instructionsModal() {
    const gameInstructions = document.getElementById("instructions");

    gameInstructions.addEventListener("click", () => {
     
      const instructionsDiv = document.createElement("div");
      instructionsDiv.classList.add("instructionsDiv");

      const modalText = document.createElement("h4");
      modalText.textContent = "Instructions:";
      modalText.style.marginBottom = "15px";
      modalText.style.fontSize = "2rem";
      modalText.style.borderBottom = "2px dotted black";

      instructionsDiv.appendChild(modalText);

      const modalHeader = document.createElement("ul");
      instructionsDiv.appendChild(modalHeader);

      modalHeader.style.borderBottom = "1px solid black";

      const instructionList = [
        { text: `Enter your name before pressing the 'Start Quiz' to begin.` },
        {
          text: `There is a total of 10 questions with the optioins True or False.`,
        },
        {
          text: `You will have 10 seconds to answer the question before the timer runs out.`,
        },
        {
          text: `Once you answer or time runs out, you will automatically move on to the next question`,
        },
        {
          text: `Your final score will be displayed at the end of the quiz.`,
        },
        { text: `Stay focused and enjoy the challenge!` },
      ];

      const listItems = instructionList.map((item) => {
        const instructionsLi = document.createElement("li");
        instructionsLi.style.textAlign = "left";
        instructionsLi.style.margin = "10px";
        instructionsLi.textContent = item.text;

        return instructionsLi;
      });

      listItems.forEach((li) => modalHeader.appendChild(li));

      const modulParagraph = document.createElement("p");
      modulParagraph.innerHTML = "Good luck! :)";
      modulParagraph.style.fontWeight = "bold";
      instructionsDiv.appendChild(modulParagraph);

      const closeButton = document.createElement("button");
      closeButton.classList.add("modulBtn");
      closeButton.innerText = "Close the instructions";

      closeButton.addEventListener("click", () => {
        document.body.removeChild(instructionsDiv);
      });
      instructionsDiv.appendChild(closeButton);
      
      document.body.appendChild(instructionsDiv);
    });
  }

  instructionsModal();
});
