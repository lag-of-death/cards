import React from 'react';
import ReactCardFlip from 'react-card-flip';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';

function Card({
  card, chooseCard, chosenCards, deckId,
}) {
  const isFlipped = (
    chosenCards.chosen.find(({ code }) => code === card.code + deckId)
      || chosenCards.guessedPairs.find((guessedCode) => guessedCode === card.code)
  );

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <button
        type="button"
        onClick={() => chooseCard(card, deckId)}
      >
        {card.code}
      </button>

      <img alt={card.code} src={card.image} />
    </ReactCardFlip>
  );
}

Card.propTypes = {
  chosenCards: propTypes.shape({
    chosen: propTypes.arrayOf(propTypes.shape({ code: propTypes.string })),
    guessedPairs: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  chooseCard: propTypes.func.isRequired,
  deckId: propTypes.string.isRequired,
  card: propTypes.shape({ image: propTypes.string, code: propTypes.string }).isRequired,
};

export default connect(
  ({ chosenCards }) => ({ chosenCards }),
  (dispatch) => ({
    chooseCard: (card, deckId) => {
      dispatch(async (disp, getState, useCases) => {
        const cards = await useCases.chooseCard(card, getState().chosenCards, deckId);

        disp({
          type: actions.CHOOSE_CARD,
          payload: cards,
        });
      });
    },
  }),
)(Card);
