import React from 'react';
import { connect, Provider } from 'react-redux';
import propTypes from 'prop-types';
import './App.css';

import Decks from './components/Decks';
import Shuffle from './components/Shuffle';
import Restart from './components/Restart';

import { actions, store } from './store';

function SaveScoreForm({ saveScore }) {
  const [name, changeName] = React.useState('');

  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();

      saveScore(name);
    }}
    >
      <input
        name="gamer"
        type="text"
        value={name}
        onChange={(evt) => {
          changeName(evt.target.value);
        }}
      />
      <button type="submit">save</button>
    </form>
  );
}

SaveScoreForm.propTypes = {
  saveScore: propTypes.func.isRequired,
};

function Game({
  isFinished, saveScore, results, startAgain,
}) {
  return isFinished ? (
    results.length
      ? (
        <>
          <div>{JSON.stringify(results.sort((a, b) => (a.rounds > b.rounds ? 1 : -1)))}</div>
          <button
            type="button"
            onClick={(evt) => {
              evt.stopPropagation();

              startAgain();
            }}
          >again!
          </button>
        </>
      )
      : (<SaveScoreForm saveScore={saveScore} />)
  ) : (
    <div className="game">
      <div>{JSON.stringify(isFinished)}</div>
      <Restart />
      <Shuffle />
      <Decks />

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

const GameContainer = connect(
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

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <GameContainer />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
