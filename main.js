document.querySelector('#blackjack__hit__button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack__stand__button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack__deal__button').addEventListener('click', blackjackDeal);

function blackjackHit () {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, PLAYER);
        updateScore(card, PLAYER);
        showScore(PLAYER);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);

    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#player__box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer__box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

        for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#player__blackjack__result').textContent = 0;
        document.querySelector('#dealer__blackjack__result').textContent = 0;

        document.querySelector('#player__blackjack__result').style.color = '#ffffff';
        document.querySelector('#dealer__blackjack__result').style.color = '#ffffff';

        document.querySelector('#blackjack__result').textContent = "Let's Play";
        document.querySelector('#blackjack__result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
    
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
    // If adding 11 keeps me below 21, add 11. Otherwise, add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color ='red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

// compute winner and return who just won
// updates the wins, draws and losses. 
function computeWinner() {
    let winner;

    if (PLAYER['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're 21
        if (PLAYER['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = PLAYER;

        } else if (PLAYER['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (PLAYER['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

        // condition: when user busts but dealer doesn't
    } else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        // condition: when user and dealer bust
    } else if (PLAYER['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    console.log('Winner is', winner);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner == PLAYER) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();

    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You Lost!';
        messageColor = 'red';
        lostSound.play();

    } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You Drew!';
        messageColor = 'black';
    }

        document.querySelector('#blackjack__result').textContent = message;
        document.querySelector('#blackjack__result').style.color = messageColor;
    }
}

// standButton.addEventListener("click", () => {
//   if (blackjackGame['isStand'] === false){
//     let card = randomCard();
//     console.log(card)
//     showCard(card, DEALER);
//     updateScore(card, DEALER);
//     showScore(DEALER);
//   }
// }) 

// standButton.addEventListener('click', () => {
//   blackjackGame['isStand'] = true;

//   if (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
//       let card = randomCard();
//       showCard(card, DEALER);
//       // updateScore(card, DEALER);
//       // showScore(DEALER);
      
//   }
//       blackjackGame['turnsOver'] = true;
//       let winner= computeWinner();
//       // showResult(winner);
//   });

// dealButton.addEventListener("click", () => {
  
// })



// // compute winner and return who just won
// // updates the wins, draws and losses. 
// function computeWinner() {
//   let winner;

//   if (PLAYER['score'] <= 21) {
//       // condition: higher score than dealer or when dealer busts but you're 21
//       if (PLAYER['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
//           blackjackGame['wins']++;
//           winner = PLAYER;

//       } else if (PLAYER['score'] < DEALER['score']) {
//           blackjackGame['losses']++;
//           winner = DEALER;

//       } else if (PLAYER['score'] === DEALER['score']) {
//           blackjackGame['draws']++;
//       }

//       // condition: when user busts but dealer doesn't
//   } else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) {
//       blackjackGame['losses']++;
//       winner = DEALER;

//       // condition: when user and dealer bust
//   } else if (PLAYER['score'] > 21 && DEALER['score'] > 21) {
//       blackjackGame['draws']++;
//   }
//   return winner;
// }

// function showResult(winner) {
//   let message, messageColor;

//   if (blackjackGame['turnsOver'] === true) {
//       if (winner == PLAYER) {
//       document.querySelector('#wins').textContent = blackjackGame['wins'];
//       message = 'You Won!';
//       messageColor = 'green';

//   } else if (winner === DEALER) {
//       document.querySelector('#losses').textContent = blackjackGame['losses'];
//       message = 'You Lost!';
//       messageColor = 'red';

//   } else {
//       document.querySelector('#draws').textContent = blackjackGame['draws'];
//       message = 'You Drew!';
//       messageColor = 'black';
//   }

//       document.querySelector('#blackjack-result').textContent = message;
//       document.querySelector('#blackjack-result').style.color = messageColor;
//   }
// }