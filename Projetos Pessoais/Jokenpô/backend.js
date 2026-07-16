
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

playerChoiceImg.addEventListener('animationend', (event) => {
   playerChoiceImg.classList.remove('choice-img-slide-up');
   playerChoiceImg.classList.remove('choice-img-slide-down');
});

playerChoiceContainer.addEventListener("wheel", (event) => {
   if (canPlay == false) return;

   if (event.deltaY < 0) {

      // animation scroll up

      playerChoiceImg.classList.add('choice-img-slide-up');

      if (currentPlayerChoice == 3) {
         currentPlayerChoice = 1;
      } else {
         currentPlayerChoice++
      }
   }

   else {

      // animation scroll down
      playerChoiceImg.classList.add('choice-img-slide-down');

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

// Toca uma animação e mostra o resultado da jogada ao final
gameChoicesContainer.addEventListener('animationend', (event) => {
   if (event.animationName === 'hit') {
      gameChoicesContainer.classList.remove('game-choices-hit');
   
   alert(play(currentPlayerChoice));
   playerChoiceContainer.classList.add('player-choice-interactable')
   canPlay = true;
   }
});

//Click interaction
//RESOLVER ISSO
playerChoiceContainer.addEventListener("click", () => {
   if (canPlay == false) return;

   for (let i = 0; i < 10; i++) {
      let randomCpuImg = Math.floor(Math.random() * 3) + 1;

      cpuChoiceContainer.classList.remove('rock-choice');
      cpuChoiceContainer.classList.remove('paper-choice');
      cpuChoiceContainer.classList.remove('scissors-choice');

      if (randomCpuImg == 1) {
         cpuChoiceContainer.classList.add('rock-choice');
      } 

      else if (randomCpuImg == 2) {
         cpuChoiceContainer.classList.add('paper-choice');
      }

      else if (randomCpuImg == 3) {
         cpuChoiceContainer.classList.add('scissors-choice');
      }
      
      setTimeout(() => {

      })
   }

   gameChoicesContainer.classList.add('game-choices-hit')
   playerChoiceContainer.classList.remove('player-choice-interactable')
   canPlay = false;
});

function play(playerChoice) {
   currentCpuChoice = Math.floor(Math.random() * 3) + 1;
   let playResult = plays[parseInt(`${playerChoice}${currentCpuChoice}`)];

   return playResult;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}