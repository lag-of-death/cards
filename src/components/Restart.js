import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';

function Restart({ restart }) {
  return (
    <button
      className="button"
      type="button"
      onClick={restart}
    >restart
    </button>
  );
}

Restart.propTypes = {
  restart: propTypes.func.isRequired,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    restart: () => {
      dispatch(async (disp, getState, useCases) => {
        const decks = await useCases.getDecks();

        disp({
          type: actions.SET_DECKS,
          payload: decks,
        });
      });
    },
  }),
)(Restart);
