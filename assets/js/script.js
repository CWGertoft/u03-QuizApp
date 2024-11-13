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

  let score = 0;
  let questionCount = 0; // Ny räknare för antal besvarade frågor

  const question = document.getElementById("question");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");

  const url = "./assets/quizQuestions.json";

  async function getQuizData() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      //console.log(data);

      showQuestion(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function showQuestion(data) {
    let random = Math.floor(Math.random() * data.length);
    let randomQuestion = "";

    for (let i = 0; i < data.length; i++) {
      if (i === random) {
        randomQuestion = data[i].question;
        //console.log(data[i].question);

        wrongAnswer = data[i].incorrect_answer;

        correctAnswer = data[i].correct_answer;

        // Slumpa ordning på alternativen
        if (Math.random() > 0.5) {  
          optionTrue = correctAnswer;
          optionFalse = wrongAnswer;
        } else {
          optionTrue = wrongAnswer;
          optionFalse = correctAnswer;
        }
      }
    }

    question.innerHTML = randomQuestion;

    option1.innerText = optionTrue;
    option2.innerText = optionFalse;
  }

  // Gör alternativen klickbara samt jämför valet med rätt eller fel svar
  // Ger poäng för rätt svar och laddar in en ny fråga
  // För fel svar händer inget med poängen, laddar in ny fråga.
  option1.addEventListener("click", function () {
    //console.log("click");

    if (optionTrue === correctAnswer) {
      score++;
      console.log("Correct");
    } else {
      console.log("Wrong");
    }

    // Öka frågeräknaren & Kontrollera om spelet är slut
    questionCount++;
    afterLastQuestion();
    getQuizData();
  });

  option2.addEventListener("click", async function () {
    if (optionFalse === correctAnswer) {
      score++;
      console.log("Correct");
    } else {
      console.log("Wrong");
    }

    // Öka frågeräknaren & Kontrollera om spelet är slut
    questionCount++;
    afterLastQuestion();
    getQuizData();
  });

  getQuizData();

  function startGame() {
    userName = input.value;
    console.log(userName);

    gameActive = true;

    if (gameActive === true) {
      // startWindow.style.display = 'none';
      // gameWindow.style.display = 'flex';
      /* Kommenterat ut koden eftersom den inte är funktionell just nu då vi inte lagt
            till någon styling än. /sjp */
    }
  }

  startBtn.addEventListener("click", function () {
    startGame();
    console.log("click!");
  });

  // Visa "Game Over" när spelaren har svarat på 10 frågor
  function afterLastQuestion() {
    if (questionCount >= 10) {
      showGameOver();
    }
  }

  function showGameOver() {
    document.getElementById("final-score").textContent = `Your final score is: ${score}`; // Sätt poängen i popupen
    document.getElementById("game-over").style.display = "flex";
  }

  function restartGame() {
    score = 0;

    // Återställ frågeräknaren
    questionCount = 0;
    document.getElementById("game-over").style.display = "none";
    getQuizData(); // Ladda om frågorna efter omstart
  }

  document.getElementById("restart-btn").addEventListener("click", restartGame);
});
