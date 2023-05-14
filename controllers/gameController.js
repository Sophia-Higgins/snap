const shuffle = require('lodash/shuffle');

const shuffleMethod = (cards) => {
  return shuffle(cards);
};

const deal = (cards, players) => {
  const halfDeckCardCount = 26;

  const firstHalfDeck = cards.slice(0, halfDeckCardCount);
  const secondHalfDeck = cards.slice(halfDeckCardCount);

  // update player 1's hand 
  players[0].hand = [...firstHalfDeck];

  // update player 2's hand
  players[1].hand = [...secondHalfDeck];
};

const randomisePlayerOrder = (players) => {
  return shuffle(players);
};

const chooseRandomPlayer = () => {
  return Math.round(Math.random());
}

const compareCards = (currentCard, previousCard, players, snapCaller) => {
  if (!previousCard) return;

  if (currentCard.suit === previousCard.suit) {

    console.log(`${players[snapCaller].name}: SNAP!`);

    players[snapCaller].score += 1;
  } else if (currentCard.value === previousCard.value) {
    console.log(`${players[snapCaller].name}: SNAP!`);
    players[snapCaller].score += 1;
  }
};

const delay = () => {
  const playCardDelay = 1000; // 1 second

  return new Promise((resolve) => setTimeout(resolve, playCardDelay));
}

const play = async (players, previousCard) => {
  let currentCard;

  await delay().then(() => {
    currentCard = players[0].hand.shift();
    console.log(`Previous card: ${JSON.stringify(previousCard)}, ${players[0].name} card: ${JSON.stringify(currentCard)}`);

    const snapCaller = chooseRandomPlayer();

    compareCards(currentCard, previousCard, players, snapCaller);
  
    previousCard = currentCard;
  });

  await delay().then(() => {
    currentCard = players[1].hand.shift();
    console.log(`Previous card: ${JSON.stringify(previousCard)}, ${players[1].name} card: ${JSON.stringify(currentCard)}`);

    const snapCaller = chooseRandomPlayer();

    compareCards(currentCard, previousCard, players, snapCaller);
  
    previousCard = currentCard;
  });

  if (players[0].hand.length !== 0) {
    play(players, previousCard);
  } else {
    console.log('Players out of cards');
    displayFinalScores(players);
  }
};

const displayFinalScores = (players) => {
  const firstPlayerName = players[0].name;
  const secondPlayerName = players[1].name;

  const firstPlayerScore = players[0].score;
  const secondPlayerScore = players[1].score;

  // assign strings to variables and return  - then console log in index.js
  // so that these can be tested more easily
  console.log(`${firstPlayerName} score: ${firstPlayerScore}`);
  console.log(`${secondPlayerName} score: ${secondPlayerScore}`);

  if (firstPlayerScore > secondPlayerScore) {
    console.log(`${firstPlayerName} Wins!`);
  } else if (secondPlayerScore > firstPlayerScore) {
    console.log(`${secondPlayerName} Wins!`);
  } else {
    console.log(`It's a tie!`)
  }
}

module.exports = {
  shuffleMethod,
  deal,
  randomisePlayerOrder,
  compareCards,
  play,
  displayFinalScores
};

