import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';
import Card from './Card';

import './Decks.css';

export function Deck({ deck }) {
  return (
    <div className="deck">
      {deck.cards.map(
        (card) => <Card deckId={deck.deck_id} key={card.code + deck.deck_id} card={card} />,
      )}
    </div>
  );
}

Deck.propTypes = {
  deck: propTypes.shape({
    deck_id: propTypes.string,
    cards: propTypes.arrayOf(propTypes.shape({ code: propTypes.string })),
  }).isRequired,
};

function DeckContainer({ decks, getDecks, rounds }) {
  React.useEffect(getDecks, []);

  return (
    <>
      <div>
        Rounds: {rounds}
      </div>
      <Deck deck={decks[0]} />
      <Deck deck={decks[1]} />
    </>
  );
}

DeckContainer.propTypes = {
  rounds: propTypes.number.isRequired,
  decks: propTypes.arrayOf(propTypes.object).isRequired,
  getDecks: propTypes.func.isRequired,
};

export default connect(
  ({ decks, chosenCards }) => ({ decks, rounds: chosenCards.rounds }),
  (dispatch) => ({
    getDecks: () => {
      dispatch(async (disp, getState, useCases) => {
        const decks = await useCases.getDecks();

        disp({
          type: actions.SET_DECKS,
          payload: decks,
        });
      });
    },
  }),
)(DeckContainer);
