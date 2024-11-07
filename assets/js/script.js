document.addEventListener("DOMContentLoaded", function () {
  const startWindow = document.getElementById("start-window");
  const gameWindow = document.getElementById("game-window");
  const startBtn = document.getElementById("start-btn");
  let gameActive = false;

  function startGame() {
    gameActive = true;
    if (gameActive === true) {
       // startWindow.style.display = 'none';
       // gameWindow.style.display = 'flex';

       /* Kommenterat ut koden eftersom den inte är funktionell just nu då vi inte lagt
          till någon styling än. /sjp */
    }
  }
    startBtn.addEventListener('click', function () {
        // startGame();

        console.log('click!');
    });
});
