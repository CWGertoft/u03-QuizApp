const storedUserName = localStorage.getItem("userName");
//console.log(storedUserName);

const mostRecentScore = parseInt(localStorage.getItem("mostRecentScore"), 10);
//console.log(mostRecentScore);

const clearBtn = document.getElementById("clean_leaderboard");

const highestResultsList = document.getElementById("highestResultsList");

const highestScores =
  JSON.parse(localStorage.getItem("highestScores")) || [].filter(
    (score) =>
      score &&
      typeof score.name === "string" &&
      typeof score.result === "number");
const MAX_HIGH_SCORES = 5;
let score;



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
    };
  
    highestScores.sort((a, b) => {
      if (!a || !b) return 0; // Skip null or undefined values
      return b.result - a.result;
    });
    highestScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem("highestScores", JSON.stringify(highestScores));
};


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
    highestResultsList.innerHTML = "";
    clearBtn.style.display = "none";
    highestResultsList.style.display = "none";

});