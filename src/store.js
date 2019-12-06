import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useCases from './useCases';

export const actions = {
  SET_DECK: 'SET_DECK',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_DECK]: (deck) => ({ ...state, deck: deck.cards }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

export const store = createStore(
  reducer,
  { deck: [] },
  applyMiddleware(thunk.withExtraArgument(useCases)),
);
