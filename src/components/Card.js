import React from 'react';
import ReactCardFlip from 'react-card-flip';
import propTypes from 'prop-types';

export default function Card({ card }) {
  const [isFlipped, changeIsFlipped] = React.useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <button type="button" onClick={() => changeIsFlipped(true)}>
        {card.code}
      </button>

      <img alt={card.code} src={card.image} />
    </ReactCardFlip>
  );
}

Card.propTypes = {
  card: propTypes.shape({ image: propTypes.string, code: propTypes.string }).isRequired,
};
