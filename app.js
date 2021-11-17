const hitButton = document.querySelector("#blackjack__hit__button");
const standButton = document.querySelector("#blackjack__stand__button");
const dealButton = document.querySelector("#blackjack__deal__button");
const playerBox = document.querySelector("#player__box");
const dealerBox = document.querySelector("#dealer__box");
let playerResult = document.querySelector('#player__blackjack__result');
let dealerResult = document.querySelector('#dealer__blackjack__result');
let playerImages = document.querySelector('#player__box').querySelectorAll('img');
let dealerImages = document.querySelector('#dealer__box').querySelectorAll('img');

let blackjackGame = {
    'player': {'scoreSpan' : '#player__blackjack__result', 'div': '#player__slot', 'score': 0},
    'dealer': {'scoreSpan' : '#dealer__blackjack__result', 'div': '#dealer__slot', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const PLAYER = blackjackGame['player']
const DEALER = blackjackGame['dealer'] 

hitButton.addEventListener("click", () => {
  if (blackjackGame['isStand'] === false){
    let card = randomCard();
    console.log(card)
    showCard(card, PLAYER);
    updateScore(card, PLAYER);
    showScore(PLAYER);
  }
}) 

const randomCard = () => {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

const showCard = (card, activePlayer) => {
  if (activePlayer['score'] <= 21 ){
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
  }
}

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
  }

const showScore = (activePlayer) => {
  if (activePlayer['score'] > 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color ='red';
  } else {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}
