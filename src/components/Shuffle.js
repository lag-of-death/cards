import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';

function Shuffle({ getShuffledDecks }) {
  return (
    <button
      className="button"
      type="button"
      onClick={getShuffledDecks}
    >shuffle
    </button>
  );
}

Shuffle.propTypes = {
  getShuffledDecks: propTypes.func.isRequired,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    getShuffledDecks: () => {
      dispatch(async (disp, getState, useCases) => {
        const decks = await useCases.getShuffledDecks();

        disp({
          type: actions.SET_DECKS,
          payload: decks,
        });
      });
    },
  }),
)(Shuffle);
