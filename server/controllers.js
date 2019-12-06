const axios = require('axios');

const { getDeckUseCase } = require('./useCases');
const { store } = require('./repository');

module.exports = {
  getDeck: () => getDeckUseCase(axios, store),
};
