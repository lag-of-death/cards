import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';

function Deck({ deck }) {
  return <div>{JSON.stringify(deck)}</div>;
}

Deck.propTypes = {
  deck: propTypes.arrayOf(propTypes.object).isRequired,
};

function DeckContainer({ decks, getDecks }) {
  React.useEffect(getDecks, []);

  return (
    <>
      <Deck deck={decks[0]} />
      <hr />
      <Deck deck={decks[1]} />
    </>
  );
}

DeckContainer.propTypes = {
  decks: propTypes.arrayOf(propTypes.arrayOf(propTypes.object)).isRequired,
  getDecks: propTypes.func.isRequired,
};

export default connect(
  ({ decks }) => ({ decks }),
  (dispatch) => ({
    getDecks: () => {
      dispatch(async (disp, getState, useCases) => {
        const deck = await useCases.getDecks();

        disp({
          type: actions.SET_DECKS,
          payload: deck,
        });
      });
    },
  }),
)(DeckContainer);
