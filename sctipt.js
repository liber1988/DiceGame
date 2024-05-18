const picture1 = document.getElementById("picture1");
const picture2 = document.getElementById("picture2");
const RollDice = document.getElementById("changeDice");
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
const backgroundMusic = document.getElementById("backgroundMusic");
const soundIcon = document.getElementById("soundIcon");
let musicPlaying = false;

function toggleSound() {
  if (musicPlaying) {
    backgroundMusic.pause();
    soundIcon.src = "images/sound-off.svg";
    musicPlaying = false;
  } else {
    backgroundMusic.play();
    soundIcon.src = "images/sound.svg";
    musicPlaying = true;
  }
}

soundIcon.addEventListener("click", toggleSound);

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
    return true;
  } else if (
    Number(player2TotalScore.textContent) > WINSCORE ||
    Number(player1TotalScore.textContent) > WINSCORE
  ) {
    youWon(!changePlayerValue);
    return true;
  }
}

function updatePlayer1(num1, num2) {
  if (num1 + 1 === ZERONUM && num2 + 1 === ZERONUM) {
    player1Score.textContent = num1 + num2 + 2;
    showDoubleSixMessage();
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
    showDoubleSixMessage();
    player2TotalScore.textContent = "0";
  } else {
    player2Score.textContent = num1 + num2 + 2;
    player2TotalScore.textContent =
      Number(player2Score.textContent) + Number(player2TotalScore.textContent);
  }
}

function changePlayer() {
  const player1 = document.getElementsByClassName("player-1");
  const player2 = document.getElementsByClassName("player-2");
  if (changePlayerValue) {
    player1[0].style.opacity = 0.6;
    player2[0].style.opacity = 1;
  } else {
    player1[0].style.opacity = 1;
    player2[0].style.opacity = 0.6;
  }
  changePlayerValue = !changePlayerValue;
  return changePlayerValue;
}
function RollDiceFunc() {
  const [num1, num2] = getRandomPictures();
  const backgroundMusic = document.getElementById("diceRollBackgroundMusic");
  backgroundMusic.play();

  if (changePlayerValue) {
    updatePlayer1(num1, num2);
    checkTotalScore();
  } else {
    updatePlayer2(num1, num2);
    checkTotalScore();
  }
}

buttonChangePlayerValue.addEventListener("click", () => {
  changePlayer();
});

function refreshPage() {
  location.reload();
}

async function ai() {
  changePlayer();
  let randomTries = Math.floor(Math.random() * 5);
  for (i = 0; i <= randomTries; i++) {
    if (checkTotalScore()) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    RollDiceFunc();
  }
  changePlayer();
}

function showDoubleSixMessage() {
  const messageElement = document.createElement("div");
  const gifImage = document.createElement("img");
  messageElement.id = "message";
  messageElement.textContent = "You got 6 and 6!";
  messageElement.style.backgroundColor = "none";
  messageElement.style.padding = "10px";
  messageElement.style.position = "absolute";
  messageElement.style.top = "20%";
  messageElement.style.left = "50%";
  messageElement.style.transform = "translate(-50%, -50%)";
  messageElement.style.width = "300px";
  messageElement.style.height = "150px";
  messageElement.style.textAlign = "center";
  messageElement.style.borderRadius = "5px";
  messageElement.style.fontSize = "30px";
  messageElement.style.color = "white";

  gifImage.src = "images/giphy.gif";
  gifImage.alt = "Double Six GIF";
  gifImage.style.display = "block";
  gifImage.style.margin = "0 auto";

  messageElement.appendChild(gifImage);

  document.body.appendChild(messageElement);

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 5000);
}
