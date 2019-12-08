import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('calls its callback', () => {
    const cb = jest.fn(() => ({}));
    const cardData = { code: 'AS', image: 'path/to/image' };
    const deckId = 'xyz';

    const card = render(
      <Card
        card={cardData}
        chooseCard={cb}
        chosenCards={{ chosen: [], guessedPairs: [] }}
        deckId={deckId}
      />,
    );

    const cardHandle = card.getByTestId('card');

    fireEvent.click(cardHandle);

    expect(card).toMatchSnapshot();
    expect(cb).toHaveBeenCalledWith(cardData, deckId);
  });
});
