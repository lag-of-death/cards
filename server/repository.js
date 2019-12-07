const { createStore } = require('redux');

const actions = {
  SET_IDS_OF_DECKS: 'SET_IDS_OF_DECKS',
  ADD_SCORE: 'ADD_SCORE',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_IDS_OF_DECKS]: (idsOfDecks) => ({ ...state, idsOfDecks }),
    [actions.ADD_SCORE]: (score) => ({ ...state, scores: state.scores.concat(score) }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

module.exports = {
  actions,
  store: createStore(reducer, { scores: [], idsOfDecks: ['', ''] }),
};
