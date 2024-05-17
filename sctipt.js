const picture1 = document.getElementById("picture1");
const picture2 = document.getElementById("picture2");
const changeDice = document.getElementById("changeDice");
const player1Score = document.getElementById("player-1-score");
const player2Score = document.getElementById("player-2-score");
const player1TotalScore = document.getElementById("player-1-total-score");
const player2TotalScore = document.getElementById("player-2-total-score");
const ZERONUM = 6;
let WINSCORE = 50;
const buttonChangePlayerValue = document.getElementById("hold");
let changePlayerValue = true;
const inputContainer = document.getElementById("input-container");
const submitButton = document.getElementById("submit-button");
const targetScoreInput = document.getElementById("number-input");
const allButtons = document.querySelectorAll("button:not(#specialButton)");

function vanishCurrentScore() {
  const currentScore = document.getElementsByClassName("current-score");
  const currentScoreArray = Array.from(currentScore);
  console.log(currentScore);
  currentScoreArray.forEach((element) => {
    element.style.opacity = 0;
  });
}

function disableAllButtonsExceptSpecial() {
  allButtons.forEach((button) => {
    button.classList.add("disabled");
    button.disabled = true;
    button.style.opacity = 0;
  });
}

function enableAllButtons() {
  allButtons.forEach((button) => {
    button.classList.remove("disabled");
    button.disabled = false;
  });
}

function changeInputText(newText) {
  targetScoreInput.value = newText;
}
changeInputText(WINSCORE);
const pictureList = [
  "images/dice-1.png",
  "images/dice-2.png",
  "images/dice-3.png",
  "images/dice-4.png",
  "images/dice-5.png",
  "images/dice-6.png",
];
function updateTargetScoreValue() {
  const targetScoreValue = Number(targetScoreInput.value);
  WINSCORE = targetScoreValue;
}
submitButton.addEventListener("click", () => {
  inputContainer.classList.add("hidden");
  updateTargetScoreValue();
});

function getRandomPictures() {
  let randomIndex1 = Math.floor(Math.random() * pictureList.length);
  let randomIndex2 = Math.floor(Math.random() * pictureList.length);
  console.log(pictureList[randomIndex1]);
  picture1.src = pictureList[randomIndex1];
  picture2.src = pictureList[randomIndex2];
  return [randomIndex1, randomIndex2];
}

function zeroTotalScores() {
  player2TotalScore.textContent = 0;
  player1TotalScore.textContent = 0;
}

function youWon(changePlayerValue) {
  if (changePlayerValue) {
    const player1 = document.getElementsByClassName("player-1");
    const youWonHeading = document.getElementById("player-1-you-won");
    player1[0].style.backgroundColor = "black";
    player1[0].style.color = "white";
    youWonHeading.style.display = "block";
  } else {
    const player2 = document.getElementsByClassName("player-2");
    const youWonHeading2 = document.getElementById("player-2-you-won");
    player2[0].style.backgroundColor = "black";
    player2[0].style.color = "white";
    youWonHeading2.style.display = "block";
  }
  zeroTotalScores();
  vanishCurrentScore();
  disableAllButtonsExceptSpecial();
}

function checkTotalScore() {
  if (
    Number(player2TotalScore.textContent) === WINSCORE ||
    Number(player1TotalScore.textContent) === WINSCORE
  ) {
    youWon(changePlayerValue);
  } else if (
    Number(player2TotalScore.textContent) > WINSCORE ||
    Number(player1TotalScore.textContent) > WINSCORE
  ) {
    youWon(!changePlayerValue);
  }
}

function updatePlayer1(num1, num2) {
  if (num1 + 1 === ZERONUM && num2 + 1 === ZERONUM) {
    player1Score.textContent = num1 + num2 + 2;
    player1TotalScore.textContent = "0";
  } else {
    player1Score.textContent = num1 + num2 + 2;
    player1TotalScore.textContent =
      Number(player1Score.textContent) + Number(player1TotalScore.textContent);
  }
}

function updatePlayer2(num1, num2) {
  if (num1 + 1 === ZERONUM && num2 + 1 === ZERONUM) {
    player2Score.textContent = num1 + num2 + 2;
    player2TotalScore.textContent = "0";
  } else {
    player2Score.textContent = num1 + num2 + 2;
    player2TotalScore.textContent =
      Number(player2Score.textContent) + Number(player2TotalScore.textContent);
  }
}

function changePlayer() {
  changePlayerValue = !changePlayerValue;
  console.log(WINSCORE);
  return changePlayerValue;
}

changeDice.addEventListener("click", () => {
  const [num1, num2] = getRandomPictures();
  if (changePlayerValue) {
    updatePlayer1(num1, num2);
    checkTotalScore();
  } else {
    updatePlayer2(num1, num2);
    checkTotalScore();
  }
});

buttonChangePlayerValue.addEventListener("click", () => {
  changePlayer();
});

function refreshPage() {
  location.reload();
}
