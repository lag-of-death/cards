const newDeckOf9cards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=9';

const newDeckWithCards = (cards) => `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cards.map(({ code }) => code)}`;

const cardsFromDeck = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=9`;

function getDecks(service, repository) {
  const { get } = service;

  return service
    .get(newDeckOf9cards)
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
    ]))
    .then(([{ data: deckAWithCards }, { data: deckBWithCards }]) => {
      const decks = [deckAWithCards, deckBWithCards];

      repository.dispatch({ type: 'SET_DECKS', payload: decks });

      return decks;
    });
}

module.exports = {
  getDecks,
};
