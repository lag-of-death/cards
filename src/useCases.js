import axios from 'axios';

function preload({ data }) {
  data[0].cards.forEach((card) => {
    new Image().src = card.image;
  });

  return data;
}

function createGetDecks(service) {
  return () => service.get('/decks').then(preload);
}

function createGetShuffledDecks(service) {
  return () => service.get('/shuffled-decks').then(preload);
}

export default {
  chooseCard: (card, chosenCards, deckId) => {
    const card_ = { ...card, code: card.code + deckId };
    const chosenCards_ = (
      (chosenCards.chosen.length < 2)
        ? chosenCards.chosen.concat(card_)
        : [card_]
    );
    const areTheSame = (
      chosenCards_.length === 2
        && (chosenCards_[0].code.substring(0, 2) === chosenCards_[1].code.substring(0, 2))
    );

    return {
      clickCounter: chosenCards.clickCounter + 1,
      chosen: chosenCards_,
      guessedPairs: areTheSame
        ? chosenCards.guessedPairs.concat(chosenCards_[0].code.substring(0, 2))
        : chosenCards.guessedPairs,
    };
  },
  getDecks: createGetDecks(axios),
  getShuffledDecks: createGetShuffledDecks(axios),
};
