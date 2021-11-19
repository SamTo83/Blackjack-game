# Blackjack-game

[You can check out my game by clicking on this link](https://samto83.github.io/Blackjack-game/)

![BlackJack main page](https://github.com/SamTo83/Blackjack-game/blob/main/main.PNG)

## Rules of the game
Player needs to get  cards to add up to 21 points or close enough to that number. Dealer needs to beat Players points or if player goes over 21. 

## The design  
### The game consist of: 
*A display section for the player and dealer to be able to see their cards. 
*Player get to go first by clicking on the Hit button, once player is happy with the points, player can click Stand button. 
*The dealer with deal its cards till it exceed over 16 points. 
*A table is created to keep score of the games played whether is win, lose or draw.  

## The code 
The content of the game is assign as a array to track the data needed. 

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

 

To allow the player to get random cards within the deck, a Math.Random was implemented to the code with another show cards function to display card received.  

const randomCard = () => { 

  let randomIndex = Math.floor(Math.random() * 13); 

  return blackjackGame['cards'][randomIndex]; 

}; 

const showCard = (card, activePlayer) => { 

  if (activePlayer['score'] <= 21 ){ 

    let cardImage = document.createElement('img'); 

    cardImage.src = `./images/cards/${card}.png`; 

    document.querySelector(activePlayer['div']).appendChild(cardImage); 

  } 

}; 

 

An if statement was used to define who is the winner during the game. 

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

  } else if (PLAYER['score'] > 21 && DEALER['score'] <= 21) { 

    blackjackGame['loses']++; 

    winner = DEALER; 

    // condition: when user and dealer bust 

  } else if (PLAYER['score'] > 21 && DEALER['score'] > 21) { 

    blackjackGame['draws']++; 

  } 

  return winner; 

}; 

## The issues I had 

*Getting the card images to display properly was a challenging part of the project 

*Getting the dealer to receive cards one by one took quite some time to achieve.  

*Displaying the scores correctly on the game and allowing the score to accumulate.  