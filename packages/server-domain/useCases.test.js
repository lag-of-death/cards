const { saveScore } = require('./useCases');

describe('saveScore()', () => {
  it('updates score-table', () => {
    const score = { gamerName: 'abc', rounds: 10 };
    const repository = {
      saveScore: jest.fn(() => ({})),
      getState: () => ({
        scores: [score],
      }),
    };

    const expectedScore = { gamerName: score.gamerName, rounds: score.rounds };

    expect(saveScore(repository, score)).resolves.toEqual([expectedScore]);
    expect(repository.saveScore).toHaveBeenCalledWith(score);
  });
});
