import propTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import ScoreSaver from './ScoreSaver';
import Restart from './Restart';
import Shuffle from './Shuffle';
import Decks from './Decks';
import { actions } from '../store';

import './Game.css';

function Game({
  isFinished, saveScore, results, startAgain,
}) {
  const content = isFinished ? (
    results.length
      ? (
        <>
          <table className="game__results">
            <thead>
              <tr>
                <th>name</th>
                <th>rounds</th>
              </tr>
            </thead>
            <tbody>
              {
                results.sort((a, b) => (a.rounds > b.rounds ? 1 : -1)).map((score) => (
                  <tr key={score.gamerName + score.rounds}>
                    <td>{score.gamerName}</td>
                    <td>{score.rounds}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button
            className="button game__restarter"
            type="button"
            onClick={(evt) => {
              evt.stopPropagation();

              startAgain();
            }}
          >again!
          </button>
        </>
      )
      : (<ScoreSaver saveScore={saveScore} />)
  ) : (
    <>
      <div className="game__action-buttons">
        <Restart />
        <Shuffle />
      </div>

      <Decks />
    </>
  );

  return (
    <div className="game">
      {content}
    </div>
  );
}

Game.propTypes = {
  isFinished: propTypes.bool.isRequired,
  saveScore: propTypes.func.isRequired,
  results: propTypes.arrayOf(
    propTypes.shape({ name: propTypes.string, score: propTypes.string }),
  ).isRequired,
  startAgain: propTypes.func.isRequired,
};

export default connect(
  ({ chosenCards, results }) => ({ isFinished: chosenCards.isFinished, results }),
  (dispatch) => ({
    startAgain: () => {
      dispatch({ type: 'START_AGAIN' });
    },
    saveScore: (gamerName) => {
      dispatch(async (disp, getState, useCases) => {
        const results = await useCases.saveScore(
          gamerName,
          getState().chosenCards.rounds,
        );

        dispatch({
          type: actions.SHOW_RESULTS,
          payload: results,
        });
      });
    },
  }),
)(Game);
