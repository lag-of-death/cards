const axios = require('axios');

const { store } = require('@decks/server-repository');
const useCases = require('./useCases');

module.exports = {
  saveScore: (req) => useCases.saveScore(store, req.body),
  getShuffledDecks: () => useCases.getShuffledDecks(axios, store),
  getDecks: () => useCases.getDecks(axios, store),
};
