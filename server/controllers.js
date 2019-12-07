const axios = require('axios');

const useCases = require('./useCases');
const { store } = require('./repository');

module.exports = {
  getDecks: () => useCases.getDecks(axios, store),
};
