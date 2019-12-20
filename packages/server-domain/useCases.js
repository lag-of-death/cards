function getDecks(service, repository) {
  return service.getDecks()
    .then(([{ data: deckAWithCards }, { data: deckBWithCards }]) => {
      const decks = [deckAWithCards, deckBWithCards];

      repository.setIdsOfDecks(decks);

      return decks;
    });
}

function getShuffledDecks(service, repository) {
  return service.getShuffledDecks(repository.getState().idsOfDecks);
}

function saveScore(repository, score) {
  repository.saveScore(score);

  return Promise.resolve(repository.getState().scores);
}

module.exports = {
  saveScore,
  getDecks,
  getShuffledDecks,
};
