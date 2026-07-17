
const results = Object.freeze(
   {
      DRAW: 1,
      CPU: 2,
      PLAYER: 3,
   }
)

const hands = {
   1: "Pedra",
   2: "Papel",
   3: "Tesoura",
}

//PLAYER x CPU
const plays = {
   11: results.DRAW,   //Pedra x Pedra
   12: results.CPU,    //Pedra x Papel
   13: results.CPU, //Pedra x Tesoura
   21: results.PLAYER, //Papel x Pedra
   22: results.DRAW,   //Papel x Papel
   23: results.CPU,    // Papel x Tesoura
   31: results.CPU,    //Tesoura x Pedra
   32: results.PLAYER, // Tesoura x Papel
   33: results.DRAW,   //Tesoura x Tesoura
}

let gameChoicesContainer = document.getElementById('game-choices')

let playerChoiceContainer = document.getElementById('player-choice');
let playerChoiceImg = document.getElementById('player-choice-img');
let playerChoiceLabel = document.getElementById('player-choice-label')

let cpuChoiceContainer = document.getElementById('cpu-choice');
let cpuChoiceImg = document.getElementById('cpu-choice-img');
let cpuChoiceLabel = document.getElementById('cpu-choice-label')

let currentPlayerChoice = 3;
let currentCpuChoice = 0;

let canPlay = true;
let roundResult = 0;

playerChoiceImg.addEventListener('animationend', (event) => {
   playerChoiceImg.classList.remove('choice-img-slide-up');
   playerChoiceImg.classList.remove('choice-img-slide-down');
});

//Scroll event listener
playerChoiceContainer.addEventListener("wheel", (event) => {
   //Returns if a round is running
   if (canPlay == false) return;

   //Scrolled up
   if (event.deltaY < 0) {

      //Animation for scrolling up
      playerChoiceImg.classList.add('choice-img-slide-up');

      //Changes current player choice index upwards
      if (currentPlayerChoice == 3) {
         currentPlayerChoice = 1;
      } else {
         currentPlayerChoice++
      }
   }

   //Scrolled down
   else {

      //Animation for scrolling up
      playerChoiceImg.classList.add('choice-img-slide-down');

      //Changes current player choice index downwards
      if (currentPlayerChoice == 1) {
         currentPlayerChoice = 3;
      } else {
         currentPlayerChoice--
      }
   }

   //Changes player choice box image

   //Rock
   if (currentPlayerChoice == 1) {
      playerChoiceImg.classList.remove('paper-choice');
      playerChoiceImg.classList.remove('scissors-choice');
      playerChoiceImg.classList.add('rock-choice');

      playerChoiceLabel.textContent = "Rock";
   } 
   
   //Paper
   else if (currentPlayerChoice == 2) {
      playerChoiceImg.classList.remove('rock-choice');
      playerChoiceImg.classList.remove('scissors-choice');
      playerChoiceImg.classList.add('paper-choice');

      playerChoiceLabel.textContent = "Paper";
   }

   //Scissors
   else if (currentPlayerChoice == 3) {
      playerChoiceImg.classList.remove('rock-choice');
      playerChoiceImg.classList.remove('paper-choice');
      playerChoiceImg.classList.add('scissors-choice');

      playerChoiceLabel.textContent = "Scissors";
   }
});

//Resets animation an interactions and shows the result with an alert
gameChoicesContainer.addEventListener('animationend', (event) => {
   if (event.animationName === 'hit') {
      gameChoicesContainer.classList.remove('game-choices-hit');
      alert(roundResult);
      playerChoiceContainer.classList.add('player-choice-interactable');
      canPlay = true;
   }
});

//Resets the rotate animation class for the cpu container
cpuChoiceContainer.addEventListener('animationend', (event) => {
   if (event.animationName === 'rotate') {
      cpuChoiceContainer.classList.remove('choice-container-rotate');
   }
});

//Click interaction for starting the round
playerChoiceContainer.addEventListener("click", () => {
   //Returns if player can't interact
   if (canPlay == false) return;

   //Gets the round result
   roundResult = play(currentPlayerChoice);


   //Makes cpu container rotate and change image to correspond randomized choice index
   cpuChoiceContainer.classList.add('choice-container-rotate');
   setCpuImg(currentCpuChoice);

   //Awaits cpu container animation finished
   setTimeout(() => {
      gameChoicesContainer.classList.add('game-choices-hit');
      playerChoiceContainer.classList.remove('player-choice-interactable');
      canPlay = false;
   }, 400);
   
});

//Round result randomization function
function play(playerChoice) {
   currentCpuChoice = Math.floor(Math.random() * 3) + 1;
   let playResult = plays[parseInt(`${playerChoice}${currentCpuChoice}`)];

   return playResult;
}

//Sets cpu img to corresponding index
function setCpuImg(number) {

   cpuChoiceImg.classList.remove('no-choice');
   cpuChoiceImg.classList.remove('rock-choice');
   cpuChoiceImg.classList.remove('paper-choice');
   cpuChoiceImg.classList.remove('scissors-choice');

   if (number == 1) {
      cpuChoiceImg.classList.add('rock-choice');
   } 

   else if (number == 2) {
      cpuChoiceImg.classList.add('paper-choice');
   }

   else if (number == 3) {
      cpuChoiceImg.classList.add('scissors-choice');
   }
}