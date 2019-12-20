const { store } = require('@decks/server-gateway');
const apiGateway = require('@decks/server-api-gateway');
const useCases = require('@decks/server-domain');

module.exports = {
  saveScore: (_, req) => useCases.saveScore(store, req.body),
  getShuffledDecks: (config) => useCases.getShuffledDecks(apiGateway(config), store),
  getDecks: (config) => useCases.getDecks(apiGateway(config), store),
};
