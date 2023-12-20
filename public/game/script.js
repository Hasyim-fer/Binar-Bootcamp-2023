// // functional Programming
// // ===========
// // Declare variable for Game choices
// let playerChoice = "";
// let computerChoice = "";

// // DOM elements
// const rock = document.getElementById("rock-player");
// const paper = document.getElementById("paper-player");
// const scissors = document.getElementById("scissors-player");
// const reset = document.getElementById("refresh-game");

// // Event listeners
// rock.onclick = () => handleClick(rock);
// paper.onclick = () => handleClick(paper);
// scissors.onclick = () => handleClick(scissors);
// reset.onclick = () => resetGame();

// // Handle player's choice
// function handleClick(playerChoose) {
//   playerChoice = playerChoose.id;
//   changeBackground(playerChoose, "#C4C4C4");
//   computerChoose();
//   disableClick("none");
//   gameRules();
// }

// // Change background color
// function changeBackground(choose, color) {
//   choose.style.backgroundColor = color;
// }

// // Disable click events on player choices
// function disableClick(value) {
//   rock.style.pointerEvents = value;
//   paper.style.pointerEvents = value;
//   scissors.style.pointerEvents = value;
// }

// // Generate computer's choice
// function computerChoose() {
//   const availableChoice = ["rock-com", "paper-com", "scissors-com"];
//   const rndInt = Math.floor(Math.random() * 3);
//   const getChoice = availableChoice[rndInt];
//   computerChoice = getChoice;
//   backgroundCom(getChoice, "#C4C4C4");
// }

// // Change background color for computer's choice
// function backgroundCom(comElement, comColor) {
//   const getComElement = document.getElementById(comElement);
//   changeBackground(getComElement, comColor);
// }

// // Show Result bar
// function showResultBar(resultBar, display) {
//   const resultElement = document.getElementById(resultBar);
//   resultElement.style.display = display;
// }

// // Game Rules
// function gameRules() {
//   if ((playerChoice === "rock-player" && computerChoice === "scissors-com") || (playerChoice === "paper-player" && computerChoice === "rock-com") || (playerChoice === "scissors-player" && computerChoice === "paper-com")) {
//     showResultBar("win", "grid");
//   } else if ((playerChoice === "rock-player" && computerChoice === "paper-com") || (playerChoice === "paper-player" && computerChoice === "scissors-com") || (playerChoice === "scissors-player" && computerChoice === "rock-com")) {
//     showResultBar("lose", "grid");
//   } else {
//     showResultBar("draw", "grid");
//   }
// }

// // Reset the game
// function resetGame() {
//   disableClick("");
//   ["rock-com", "paper-com", "scissors-com"].forEach((comElement) => backgroundCom(comElement, "transparent"));
//   [rock, paper, scissors].forEach((choice) => changeBackground(choice, "transparent"));
//   ["win", "lose", "draw"].forEach((resultBar) => showResultBar(resultBar, "none"));
// }
// // ===========

// ===========
// Implementation Object-Oriented Programming
class Player {
  // Handle player's choice
  handleClick(playerChoose) {
    game.changeBackground(playerChoose, "#C4C4C4");
    computer.computerChoose();
    game.updateChoice(playerChoose.id, computer.computerChoice);
    this.disableClick("none");
    game.gameRules();
  }

  // Disable click events on player choices
  disableClick(value) {
    [game.rock, game.paper, game.scissors].forEach((event) => {
      event.style.pointerEvents = value;
    });
  }
}
const player = new Player();

class Computer {
  // Generate computer's choice
  computerChoose() {
    const availableChoice = ["rock-com", "paper-com", "scissors-com"];
    const rndInt = Math.floor(Math.random() * 3);
    const getChoice = availableChoice[rndInt];
    this.backgroundCom(getChoice, "#C4C4C4");
    this.computerChoice = getChoice;
  }

  // Change background color for computer's choice
  backgroundCom(comElement, comColor) {
    const getComElement = document.getElementById(comElement);
    game.changeBackground(getComElement, comColor);
  }
}
const computer = new Computer();

class Game {
  constructor() {
    // DOM elements
    this.rock = document.getElementById("rock-player");
    this.paper = document.getElementById("paper-player");
    this.scissors = document.getElementById("scissors-player");
    this.reset = document.getElementById("refresh-game");
  }

  click() {
    // Event listeners
    this.rock.onclick = () => player.handleClick(this.rock);
    this.paper.onclick = () => player.handleClick(this.paper);
    this.scissors.onclick = () => player.handleClick(this.scissors);
    this.reset.onclick = () => game.resetGame();
  }

  // update choices player/computer
  updateChoice(playerChoice, computerChoice) {
    this.playerChoice = playerChoice;
    this.computerChoice = computerChoice;
  }

  // Change background color
  changeBackground(choose, color) {
    choose.style.backgroundColor = color;
  }
  // Show Result bar
  showResultBar(resultBar, display) {
    const resultElement = document.getElementById(resultBar);
    resultElement.style.display = display;
  }

  // Game Rules
  gameRules() {
    if (
      (this.playerChoice === "rock-player" && this.computerChoice === "scissors-com") ||
      (this.playerChoice === "paper-player" && this.computerChoice === "rock-com") ||
      (this.playerChoice === "scissors-player" && this.computerChoice === "paper-com")
    ) {
      this.showResultBar("win", "grid");
    } else if (
      (this.playerChoice === "rock-player" && this.computerChoice === "paper-com") ||
      (this.playerChoice === "paper-player" && this.computerChoice === "scissors-com") ||
      (this.playerChoice === "scissors-player" && this.computerChoice === "rock-com")
    ) {
      this.showResultBar("lose", "grid");
    } else {
      this.showResultBar("draw", "grid");
    }
  }

  // Reset the game
  resetGame() {
    player.disableClick("");
    ["rock-com", "paper-com", "scissors-com"].forEach((comElement) => computer.backgroundCom(comElement, "transparent"));
    [game.rock, game.paper, game.scissors].forEach((choice) => game.changeBackground(choice, "transparent"));
    ["win", "lose", "draw"].forEach((resultBar) => game.showResultBar(resultBar, "none"));
  }
}
const game = new Game();
game.click();
