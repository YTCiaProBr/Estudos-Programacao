
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
   13: results.PLAYER, //Pedra x Tesoura
   21: results.PLAYER, //Papel x Pedra
   22: results.DRAW,   //Papel x Papel
   23: results.CPU,    // Papel x Tesoura
   31: results.CPU,    //Tesoura x Pedra
   32: results.PLAYER, // Tesoura x Papel
   33: results.DRAW,   //Tesoura x Tesoura
}

let playerChoiceContainer = document.getElementById('player-choice');
let playerChoiceImg = document.getElementById('player-choice-img');
let playerChoiceLabel = document.getElementById('player-choice-label')

let cpuChoiceContainer = document.getElementById('cpu-choice');
let cpuChoiceImg = document.getElementById('cpu-choice-img');
let cpuChoiceLabel = document.getElementById('cpu-choice-label')

let currentPlayerChoice = 3;
let currentCpuChoice = 0;

playerChoiceContainer.addEventListener("wheel", (event) => {
   if (event.deltaY < 0) {

      if (currentPlayerChoice == 3) {
         currentPlayerChoice = 1;
      } else {
         currentPlayerChoice++
      }
   }

   else {
      if (currentPlayerChoice == 1) {
         currentPlayerChoice = 3;
      } else {
         currentPlayerChoice--
      }
   }

   //Pedra
   if (currentPlayerChoice == 1) {
      playerChoiceImg.classList.remove('paper-choice');
      playerChoiceImg.classList.remove('scissors-choice');
      playerChoiceImg.classList.add('rock-choice');

      playerChoiceLabel.textContent = "Rock";
   } 
   
   //Papel
   else if (currentPlayerChoice == 2) {
      playerChoiceImg.classList.remove('rock-choice');
      playerChoiceImg.classList.remove('scissors-choice');
      playerChoiceImg.classList.add('paper-choice');

      playerChoiceLabel.textContent = "Paper";
   }

   //Tesoura
   else if (currentPlayerChoice == 3) {
      playerChoiceImg.classList.remove('rock-choice');
      playerChoiceImg.classList.remove('paper-choice');
      playerChoiceImg.classList.add('scissors-choice');

      playerChoiceLabel.textContent = "Scissors";
   }
});

playerChoiceContainer.addEventListener("click", () => {
   alert(play(currentPlayerChoice));
});

function play(playerChoice) {
   currentCpuChoice = Math.floor(Math.random() * 3) + 1;
   let playResult = plays[parseInt(`${playerChoice}${currentCpuChoice}`)];

   return playResult;
}