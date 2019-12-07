import axios from 'axios';

function transform({ data }) {
  return [data[0].cards, data[1].cards];
}

function preload(decks) {
  decks[0].forEach((card) => {
    new Image().src = card.image;
  });

  return decks;
}

function createGetDecks(service) {
  return () => service.get('/decks').then(transform).then(preload);
}

function createGetShuffledDecks(service) {
  return () => service.get('/shuffled-decks').then(transform).then(preload);
}

export default {
  getDecks: createGetDecks(axios),
  getShuffledDecks: createGetShuffledDecks(axios),
};
