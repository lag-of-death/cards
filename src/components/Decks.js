import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../store';
import Card from './Card';

function Deck({ deck }) {
  return (
    <div style={{ display: 'flex' }}>
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
  decks: propTypes.arrayOf(propTypes.object).isRequired,
  getDecks: propTypes.func.isRequired,
};

export default connect(
  ({ decks, chosenCards }) => ({ decks, chosenCards }),
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
