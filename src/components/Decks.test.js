import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Deck } from './Decks';

describe('Deck', () => {
  it('renders properly', () => {
    const deck = {
      deck_id: 'xyz',
      cards: [{ code: 'AS', image: 'path/to/image' }],
    };
    const store = createStore((state) => state, { chosenCards: { chosen: [], guessedPairs: [] } });

    const deckA = render(
      <Provider store={store}>
        <Deck deck={deck} />
      </Provider>,
    );

    expect(deckA).toMatchSnapshot();
  });
});
