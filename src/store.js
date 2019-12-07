import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useCases from './useCases';

const initialChosenCards = {
  guessedPairs: [], chosen: [], clickCounter: 0, isFinished: false, rounds: 0,
};

export const actions = {
  SET_DECKS: 'SET_DECKS',
  SHOW_RESULTS: 'SHOW_RESULTS',
  CHOOSE_CARD: 'CHOOSE_CARD',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_DECKS]: (decks) => ({ ...state, decks, chosenCards: initialChosenCards }),
    [actions.CHOOSE_CARD]: (chosenCards) => (
      {
        ...state,
        chosenCards: { ...chosenCards, rounds: Math.floor(chosenCards.clickCounter / 2) },
      }
    ),
    [actions.SHOW_RESULTS]: (results) => ({ ...state, results }),
  };

  try {
    return handlers[action.type](action.payload);
  } catch (e) {
    return state;
  }
};

export const store = createStore(
  reducer,
  { decks: [{ cards: [], deck_id: '' }, { cards: [], deck_id: '' }], chosenCards: initialChosenCards, results: [] },
  applyMiddleware(thunk.withExtraArgument(useCases)),
);
