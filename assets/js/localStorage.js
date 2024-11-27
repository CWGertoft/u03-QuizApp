const clearBtn = document.getElementById("clean_leaderboard");
const highestResultsList = document.getElementById("highestResultsList");
const startBtn = document.getElementById("start-btn");

const highestScores =
  JSON.parse(localStorage.getItem("highestScores")) ||
  [].filter(
    (score) =>
      score &&
      typeof score.name === "string" &&
      typeof score.result === "number"
  );

const MAX_HIGH_SCORES = 5;
let score;

export function saveToLocalStorage() {
  const storedUserName = localStorage.getItem("userName");
  const mostRecentScore = parseInt(localStorage.getItem("mostRecentScore"), 10);
  if (storedUserName && mostRecentScore !== null) {
    const existingUserIndex = highestScores.findIndex(
      (score) => score && score.name === storedUserName
    );
    if (existingUserIndex >= 0) {
      if (mostRecentScore > highestScores[existingUserIndex].result) {
        highestScores[existingUserIndex].result = mostRecentScore;
      }
    } else {
      score = {
        name: storedUserName,
        result: mostRecentScore,
      };

      highestScores.push(score);

      clearBtn.style.display = "flex";
      highestResultsList.style.display = "flex";
      highestResultsList.style.flexDirection = "column";
    }

    highestScores.sort((a, b) => {
      if (!a || !b) return 0; // Skip null or undefined values
      return b.result - a.result;
    });

    highestScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem("highestScores", JSON.stringify(highestScores));
  }
}

export function showLeaderBoard() {
  highestResultsList.innerHTML = highestScores
    .filter(
      (score) =>
        score &&
        typeof score.name === "string" &&
        typeof score.result === "number"
    )
    .map((score) => `<li> ${score.name} - ${score.result} </li>`)
    .join("");

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("highestScores");
    highestScores.splice(0, highestScores.length);
    highestResultsList.innerHTML = "";
    clearBtn.style.display = "none";
    highestResultsList.style.display = "none";

    /*-----Update game-over section with different text-----*/
    const gameOverSection = document.getElementById("game-over");
    gameOverSection.innerHTML = `
      <h2>Thanks for participating in our quiz 🙏 </h2>
      <p>The leaderboard has been cleared.</p>
      <button id="play-again-btn" class="btn">Play Again</button>
    `;
    /*---- Add event listener for the "Play Again" button-----*/
    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.addEventListener("click", restartGame);
    playAgainBtn.style.cursor = "pointer";
  });
}
