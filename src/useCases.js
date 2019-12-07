import axios from 'axios';

function transform({ data }) {
  return [data[0].cards, data[1].cards];
}

function createGetDecks(service) {
  return () => service.get('/decks').then(transform);
}

function createGetShuffledDecks(service) {
  return () => service.get('/shuffled-decks').then(transform);
}

export default {
  getDecks: createGetDecks(axios),
  getShuffledDecks: createGetShuffledDecks(axios),
};
