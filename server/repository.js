const { createStore } = require('redux');

const actions = {
  SET_IDS_OF_DECKS: 'SET_IDS_OF_DECKS',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_IDS_OF_DECKS]: (idsOfDecks) => ({ ...state, idsOfDecks }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

module.exports = {
  actions,
  store: createStore(reducer, { idsOfDecks: ['', ''] }),
};
