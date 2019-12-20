const { actions } = require('@decks/server-gateway');
const { saveScore } = require('./useCases');

describe('saveScore()', () => {
  it('updates score-table', () => {
    const score = { gamerName: 'abc', rounds: 10 };
    const dispatch = jest.fn(() => ({}));

    const repository = {
      dispatch,
      getState: () => ({
        scores: [score],
      }),
    };

    const expectedScore = { gamerName: score.gamerName, rounds: score.rounds };

    expect(saveScore(repository, score)).resolves.toEqual([expectedScore]);
    expect(dispatch).toHaveBeenCalledWith({ payload: expectedScore, type: actions.ADD_SCORE });
  });
});
