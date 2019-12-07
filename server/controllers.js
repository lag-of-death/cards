const axios = require('axios');

const useCases = require('./useCases');
const { store } = require('./repository');

module.exports = {
  saveScore: (req) => useCases.saveScore(store, req.body),
  getShuffledDecks: () => useCases.getShuffledDecks(axios, store),
  getDecks: () => useCases.getDecks(axios, store),
};
