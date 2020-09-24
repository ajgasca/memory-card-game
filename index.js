const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let completedPairs = 0;

function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
  if (completedPairs === 6) {
    setTimeout( () => {
      endGame();
    }, 1000);
  }
}

function checkForMatch() {
  //do cards match?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  completedPairs++
  console.log({completedPairs});

  controlBoard();
}

function unflipCards() {
  lockBoard = true; 

  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    controlBoard();
  }, 1500);
}

function controlBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach ( card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function activateCards() {
  cards.forEach( card => card.addEventListener('click', flipCard));
}

function endGame() {
  cards.forEach( card => card.classList.remove('flip'));
  activateCards();
  controlBoard();
  shuffleCards();
  completedPairs = 0;
}

shuffleCards();
activateCards();