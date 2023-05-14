const gameController = require('./gameController');
const Cards = require('../models/cards');

test('calling deal adds half the deck to player 1 and half the deck to player 2', () => {
  const testPlayers = [
    {
      name: 'Player 1', 
      score: 0,
      hand: []
    },
    {
      name: 'Player 2', 
      score: 0,
      hand: []
    }
  ];

  gameController.deal(Cards, testPlayers);

  expect(Cards.length).toEqual(52);

  expect(testPlayers[0].hand.length).toEqual(26);
  expect(testPlayers[1].hand.length).toEqual(26);
});

test('comparing two cards with the same suit causes a player to shout SNAP', () => {
  const testPlayers = [
    {
      name: 'Player 1', 
      score: 0,
      hand: []
    },
    {
      name: 'Player 2', 
      score: 0,
      hand: []
    }
  ];

  gameController.compareCards({ suit: 'H', value: 5 }, {suit: 'H', value: 'K' }, testPlayers, 0);

  expect(testPlayers[0].score).toEqual(1);
  expect(testPlayers[1].score).toEqual(0);
});

test('comparing two cards with the same value causes a player to shout SNAP', () => {
  const testPlayers = [
    {
      name: 'Player 1', 
      score: 0,
      hand: []
    },
    {
      name: 'Player 2', 
      score: 0,
      hand: []
    }
  ];

  gameController.compareCards({ suit: 'S', value: 5 }, {suit: 'H', value: 5 }, testPlayers, 1);

  expect(testPlayers[0].score).toEqual(0);
  expect(testPlayers[1].score).toEqual(1);
});
