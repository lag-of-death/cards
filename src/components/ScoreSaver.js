import React from 'react';
import propTypes from 'prop-types';

import './ScoreSaver.css';

export default function ScoreSaver({ saveScore }) {
  const [name, changeName] = React.useState('');

  return (
    <>
      <div className="save-score__message">
        Congratulations! Now, if you save your result, you will be shown the scoreboard!
      </div>

      <form
        className="save-score__form"
        onSubmit={(evt) => {
          evt.preventDefault();

          saveScore(name);
        }}
      >

        <label htmlFor="gamer">Gamer name:
          <input
            className="button save-score__name-input"
            id="gamer"
            name="gamer"
            type="text"
            value={name}
            onChange={(evt) => {
              changeName(evt.target.value);
            }}
          />
        </label>

        <button
          className="button"
          type="submit"
        >save score
        </button>
      </form>
    </>
  );
}

ScoreSaver.propTypes = {
  saveScore: propTypes.func.isRequired,
};
