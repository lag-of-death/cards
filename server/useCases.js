const { actions } = require('./repository');

const newDeckOf9cards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=9';
const newDeckWithCards = (cards) => `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cards.map(({ code }) => code)}`;
const cardsFromDeck = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=9`;
const shuffledCards = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;

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

      repository.dispatch(
        {
          type: actions.SET_IDS_OF_DECKS,
          payload: decks.map(({ deck_id }) => deck_id),
        },
      );

      return decks;
    });
}

function getShuffledDecks(service, repository) {
  const { get } = service;

  const [deckAId, deckBId] = repository.getState().idsOfDecks;

  return Promise
    .all([get(shuffledCards(deckAId)), get(shuffledCards(deckBId))])
    .then(
      () => Promise.all([
        get(cardsFromDeck(deckAId)),
        get(cardsFromDeck(deckBId)),
      ]),
    )
    .then(
      ([{ data: deckAWithCards }, { data: deckBWithCards }]) => [deckAWithCards, deckBWithCards],
    );
}

module.exports = {
  getDecks,
  getShuffledDecks,
};
