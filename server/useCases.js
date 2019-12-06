module.exports = {
  getDeckUseCase: (service, repository) => (service
    .get('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
    .then((data) => {
      repository.dispatch({ type: 'SET_DECK', payload: data });

      return data;
    })
  ),
};

