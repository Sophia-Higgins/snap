const Cards = require('./models/cards');
const Players = require('./models/players');
const { shuffleMethod, deal, randomisePlayerOrder, play } = require('./controllers/gameController');

const shuffledDeck = shuffleMethod(Cards);

deal(shuffledDeck, Players);

randomisePlayerOrder(Players);

play(Players);

