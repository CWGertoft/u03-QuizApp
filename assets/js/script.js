document.addEventListener("DOMContentLoaded", function () {
  const startWindow = document.getElementById("start-window");
  const gameWindow = document.getElementById("game-window");
  const question = document.getElementById("question");
  const startBtn = document.getElementById("start-btn");
  const input = document.getElementById("name-input");

  
  // const url = "https://opentdb.com/api.php?amount=50&category=9";
  const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

  let userName = "";
  let gameActive = false;


  async function getQuizData() {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      // return data.results;
      showQuestion(data.results);

    } catch(error) {
      console.log(error);
    };

  }

  function showQuestion(data) {
    
    let random = Math.floor(Math.random() * data.length);
    let randomQuestion = "";
    
    for (let i = 0; i < data.length; i++){
      
      if (i === random) {
        console.log(data[i].question);
        randomQuestion = data[i].question;
      };
        
    };

    question.innerHTML = randomQuestion;

  };

    /* function displayQuestion(question)  */

  


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
    startBtn.addEventListener('click', function () {
        startGame();

        console.log('click!');
    });
});
