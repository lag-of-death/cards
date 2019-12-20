const axios = require('axios');

const { store } = require('@decks/server-gateway');
const useCases = require('@decks/server-domain');

module.exports = {
  saveScore: (req) => useCases.saveScore(store, req.body),
  getShuffledDecks: () => useCases.getShuffledDecks(axios, store),
  getDecks: () => useCases.getDecks(axios, store),
};
