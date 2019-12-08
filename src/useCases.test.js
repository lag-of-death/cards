import useCases from './useCases';

describe('chooseCard()', () => {
  it('adds a card to the pair of chosen cards in a round', () => {
    expect(
      useCases.chooseCard({ code: 'JD' }, { clickCounter: 0, chosen: [], guessedPairs: [] }, 'xyz').chosen,
    ).toStrictEqual([{ code: 'JDxyz' }]);

    expect(
      useCases.chooseCard({ code: 'AS' }, { clickCounter: 0, chosen: [{ code: 'JDxyz' }], guessedPairs: [] }, 'abc').chosen,
    ).toStrictEqual([{ code: 'JDxyz' }, { code: 'ASabc' }]);
  });

  it('increments the counter', () => {
    expect(
      useCases.chooseCard({ code: 'JD' }, { clickCounter: 0, chosen: [], guessedPairs: [] }, 'xyz').clickCounter,
    ).toBe(1);
  });
});
