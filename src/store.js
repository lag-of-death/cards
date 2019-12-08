import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useCases from './useCases';

const initialChosenCards = {
  guessedPairs: [], chosen: [], clickCounter: 0, isFinished: false, rounds: 0,
};

const initialDecks = [{ cards: [], deck_id: '' }, { cards: [], deck_id: '' }];

export const actions = {
  SET_DECKS: 'SET_DECKS',
  SHOW_RESULTS: 'SHOW_RESULTS',
  CHOOSE_CARD: 'CHOOSE_CARD',
  START_AGAIN: 'START_AGAIN',
};

const reducer = (state, action) => {
  const handlers = {
    [actions.SET_DECKS]: (decks) => ({ ...state, decks, chosenCards: initialChosenCards }),
    [actions.START_AGAIN]: () => ({
      ...state, chosenCards: initialChosenCards, results: [], decks: initialDecks,
    }),
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
  { decks: initialDecks, chosenCards: initialChosenCards, results: [] },
  applyMiddleware(thunk.withExtraArgument(useCases)),
);
