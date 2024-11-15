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

  let count = 10;
  let countdownInterval = "";

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

  function startGame() {

    gameActive = true;

    if(gameActive === true) {

      startWindow.style.display = "none";
      gameWindow.style.display = "flex";
      getQuestions();
    };
  };

  startBtn.addEventListener('click', function() {

    if((input.value === "") || (input.value === null)) {
      alert("Please enter a name!")
    } else {
      userName = input.value;
      startGame();
    };

    console.log(userName);
  });

  function showQuestion(data) {

    if (gameActive === true) {
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
        };
      };
  
      startCountdown();
    };
  };

  option1.addEventListener("click", function () {
    //console.log("click");

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
    };

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
    };
    
  });

  function startCountdown() {

    count = 10; //Återställer räknaren /SJ
    document.getElementById("countdown").innerText = `Time left: ${count}`;

    clearInterval(countdownInterval);


    countdownInterval = setInterval (() => {
      count--;
      document.getElementById("countdown").innerText = `Time left: ${count}`; 

      if (count <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innertext = "Time out!";
        currentQuestion++;
        getQuestions();

        if (currentQuestion >= 10) {

          showGameOver();
        };
      };
    },1000);
  };

  function showGameOver() {
    document.getElementById("final-score").textContent = `Your final score is: ${score}`; // Sätt poängen i popupen
    document.getElementById("game-over").style.display = "flex";
  }

  function restartGame() {
    score = 0;

    // Återställ frågeräknaren
    currentQuestion = 0;
    gameActive = false;
    document.getElementById("game-over").style.display = "none";
    gameWindow.style.display = "none";
    startWindow.style.display = "flex";
  }

  document.getElementById("restart-btn").addEventListener("click", restartGame);
});
