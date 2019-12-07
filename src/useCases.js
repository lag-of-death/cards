import axios from 'axios';

function createGetDecks(service) {
  return () => service.get('/decks').then(({ data }) => [data[0].cards, data[1].cards]);
}

export default {
  getDecks: createGetDecks(axios),
};
