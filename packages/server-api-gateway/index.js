const { get } = require('axios');

const newDeckWithCards = (cards) => `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cards.map(({ code }) => code)}`;
const shuffledCards = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;

module.exports = ({ numberOfCardsToDraw }) => {
  const cardsFromDeck = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCardsToDraw}`;
  const newDeckOf9cards = `https://deckofcardsapi.com/api/deck/new/draw/?count=${numberOfCardsToDraw}`;

  return {

    getShuffledDecks: ([deckAId, deckBId]) => Promise
      .all([get(shuffledCards(deckAId)), get(shuffledCards(deckBId))])
      .then(
        () => Promise.all([
          get(cardsFromDeck(deckAId)),
          get(cardsFromDeck(deckBId)),
        ]),
      )
      .then(
        ([{ data: deckAWithCards }, { data: deckBWithCards }]) => [deckAWithCards, deckBWithCards],
      ),

    getDecks: () => get(newDeckOf9cards)
      .then(({ data }) => {
        const newPartialDeck = newDeckWithCards(data.cards);

        return Promise.all([
          get(newPartialDeck),
          get(newPartialDeck),
        ]);
      })
      .then(([{ data: deckA }, { data: deckB }]) => Promise.all([
        get(cardsFromDeck(deckA.deck_id)),
        get(cardsFromDeck(deckB.deck_id)),
      ])),

  };
};
