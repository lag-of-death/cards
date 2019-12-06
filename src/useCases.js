import axios from 'axios';

function createGetDeck(service) {
  return () => service.get('/deck').then(({ data }) => data);
}

export default {
  getDeck: createGetDeck(axios),
};
