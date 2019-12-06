import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../store';

function Deck({ deck, getDeck }) {
  React.useEffect(getDeck, []);

  return <div>{JSON.stringify(deck)}</div>;
}

Deck.propTypes = {
  deck: propTypes.arrayOf(propTypes.object).isRequired,
  getDeck: propTypes.func.isRequired,
};

export default connect(
  ({ deck }) => ({ deck }),
  (dispatch) => ({
    getDeck: () => {
      dispatch(async (disp, getState, useCases) => {
        const deck = await useCases.getDeck();

        disp({
          type: actions.SET_DECK,
          payload: deck,
        });
      });
    },
  }),
)(Deck);
