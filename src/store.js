import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useCases from './useCases';

export const actions = {
  SET_DECKS: 'SET_DECKS',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_DECKS]: (decks) => ({ ...state, decks }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

export const store = createStore(
  reducer,
  { decks: [[], []] },
  applyMiddleware(thunk.withExtraArgument(useCases)),
);
