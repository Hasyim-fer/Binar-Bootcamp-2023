// Declare variable for Game choices
let playerChoice;
let computerChoice;

// DOM elements
const rock = document.getElementById("rock-player");
const paper = document.getElementById("paper-player");
const scissors = document.getElementById("scissors-player");
const reset = document.getElementById("refresh-game");

// Event listeners
rock.onclick = () => handleClick(rock);
paper.onclick = () => handleClick(paper);
scissors.onclick = () => handleClick(scissors);
reset.onclick = () => resetGame();

// Handle player's choice
function handleClick(playerChoose) {
  playerChoice = playerChoose.id;
  changeBackground(playerChoose, "#C4C4C4");
  computerChoose();
  disableClick("none");
  gameRules();
}

// Change background color
function changeBackground(choose, color) {
  choose.style.backgroundColor = color;
}

// Disable click events on player choices
function disableClick(value) {
  rock.style.pointerEvents = value;
  paper.style.pointerEvents = value;
  scissors.style.pointerEvents = value;
}

// Generate computer's choice
function computerChoose() {
  const availableChoice = ["rock-com", "paper-com", "scissors-com"];
  const rndInt = Math.floor(Math.random() * 3);
  const getChoice = availableChoice[rndInt];
  computerChoice = getChoice;
  backgroundCom(getChoice, "#C4C4C4");
}

// Change background color for computer's choice
function backgroundCom(comElement, comColor) {
  const getComElement = document.getElementById(comElement);
  changeBackground(getComElement, comColor);
}

// Show Result bar
function showResultBar(resultBar, display) {
  const resultElement = document.getElementById(resultBar);
  resultElement.style.display = display;
}

// Game Rules
function gameRules() {
  if ((playerChoice === "rock-player" && computerChoice === "scissors-com") || (playerChoice === "paper-player" && computerChoice === "rock-com") || (playerChoice === "scissors-player" && computerChoice === "paper-com")) {
    showResultBar("win", "grid");
  } else if ((playerChoice === "rock-player" && computerChoice === "paper-com") || (playerChoice === "paper-player" && computerChoice === "scissors-com") || (playerChoice === "scissors-player" && computerChoice === "rock-com")) {
    showResultBar("lose", "grid");
  } else {
    showResultBar("draw", "grid");
  }
}

// Reset the game
function resetGame() {
  disableClick("");
  ["rock-com", "paper-com", "scissors-com"].forEach((comElement) => backgroundCom(comElement, "transparent"));
  [rock, paper, scissors].forEach((choice) => changeBackground(choice, "transparent"));
  ["win", "lose", "draw"].forEach((resultBar) => showResultBar(resultBar, "none"));
}
