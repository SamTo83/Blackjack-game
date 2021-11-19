import confetti from "./node_modules/canvas-confetti/dist/confetti.module.mjs";

const hitButton = document.querySelector(".blackjack__hit__button");
const standButton = document.querySelector(".blackjack__stand__button");
const dealButton = document.querySelector(".blackjack__deal__button");
const playerBox = document.querySelector(".player__box");
const dealerBox = document.querySelector(".dealer__box");


// Create the arrays for the black jack components
let blackjackGame = {
  'player': {'scoreSpan' : '.player__blackjack__result', 'div': '.player__slot', 'score': 0},
  'dealer': {'scoreSpan' : '.dealer__blackjack__result', 'div': '.dealer__slot', 'score': 0},
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A':[1,11]},
  'wins': 0,
  'loses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
};
// Create the player and dealer
const PLAYER = blackjackGame['player']
const DEALER = blackjackGame['dealer'] 
// Hit button function to get random card, show card and show/update score
hitButton.addEventListener("click", () => {
  if (blackjackGame['isStand'] === false){
    let card = randomCard();
    showCard(card, PLAYER);
    updateScore(card, PLAYER);
    showScore(PLAYER);
  }
});
// function to receive a random card from the array
const randomCard = () => {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
};
// function to input card image into the players/dealers slot
const showCard = (card, activePlayer) => {
  if (activePlayer['score'] <= 21 ){
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
  }
};


document.querySelector('.blackjack__stand__button').addEventListener('click', dealerLogic);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      await sleep(1000);
  }
      blackjackGame['turnsOver'] = true;
      let winner= computeWinner();
      showResult(winner);
}


dealButton.addEventListener("click", () => {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;
    let playerImages = document.querySelector(playerBox).querySelectorAll('img');
    let dealerImages = document.querySelector(dealerBox).querySelectorAll('img');
    for (let i = 0; i < playerImages.length; i++) {
    playerImages[i].remove();
  }
    for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }
    PLAYER['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('.player__blackjack__result').textContent = 0;
    document.querySelector('.dealer__blackjack__result').textContent = 0;
    document.querySelector('.player__blackjack__result').style.color = '#ffffff';
    document.querySelector('.dealer__blackjack__result').style.color = '#ffffff';
    blackjackGame['turnsOver'] = true;
}
});

// update the score on the players/dealers score slot
const updateScore = (card, activePlayer) => {
  if (card === 'A'){
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
  };

const showScore = (activePlayer) => {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color ='red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
};

// compute winner and return who just won
// updates the wins, draws and losses. 
const computeWinner = () => {
  let winner;

if (PLAYER['score'] <= 21) {
  // condition: higher score than dealer or when dealer busts but you're 21
  if (PLAYER['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
    blackjackGame['wins']++;
    winner = PLAYER;

  } else if (PLAYER['score'] < DEALER['score']) {
    blackjackGame['loses']++;
    winner = DEALER;

  } else if (PLAYER['score'] === DEALER['score']) {
    blackjackGame['draws']++;
  }

    // condition: when user busts but dealer doesn't
  } else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['loses']++;
    winner = DEALER;

    // condition: when user and dealer bust
  } else if (PLAYER['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }
  return winner;
};

const celebrate = () => {
  const confettiType = {
    particleCount: 400,
    startVelocity: 80,
    spread: 400,
  }
  confetti(confettiType);
};

const showResult = (winner) => {
let message, messageColor;
  if (blackjackGame['turnsOver'] === true) {
    if (winner == PLAYER) {
    document.querySelector('.wins').textContent = blackjackGame['wins'];
    message = 'You Won!';
    messageColor = 'white';
    celebrate();
  } else if (winner === DEALER) {
    document.querySelector('.loses').textContent = blackjackGame['loses'];
    message = 'You Lost!';
    messageColor = 'red';
  } else {
    document.querySelector('.draws').textContent = blackjackGame['draws'];
    message = 'You Drew!';
    messageColor = 'black';
  }
    document.querySelector('.blackjack__result').textContent = message;
    document.querySelector('.blackjack__result').style.color = messageColor;
  }
};
