import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useCases from './useCases';

const initialChosenCards = { guessedPairs: [], chosen: [], clickCounter: 0 };

export const actions = {
  SET_DECKS: 'SET_DECKS',
  CHOOSE_CARD: 'CHOOSE_CARD',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_DECKS]: (decks) => ({ ...state, decks, chosenCards: initialChosenCards }),
    [actions.CHOOSE_CARD]: (chosenCards) => ({ ...state, chosenCards }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

export const store = createStore(
  reducer,
  { decks: [{ cards: [], deck_id: '' }, { cards: [], deck_id: '' }], chosenCards: initialChosenCards },
  applyMiddleware(thunk.withExtraArgument(useCases)),
);
