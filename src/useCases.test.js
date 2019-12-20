import useCases from './useCases';

const uc = useCases({ numberOfCardsToDraw: 5 });

describe('chooseCard()', () => {
  it('adds a card to the pair of chosen cards in a round', () => {
    expect(
      uc.chooseCard({ code: 'JD' }, { clickCounter: 0, chosen: [], guessedPairs: [] }, 'xyz').chosen,
    ).toStrictEqual([{ code: 'JDxyz' }]);

    expect(
      uc.chooseCard({ code: 'AS' }, { clickCounter: 0, chosen: [{ code: 'JDxyz' }], guessedPairs: [] }, 'abc').chosen,
    ).toStrictEqual([{ code: 'JDxyz' }, { code: 'ASabc' }]);
  });

  it('increments the counter', () => {
    expect(
      uc.chooseCard({ code: 'JD' }, { clickCounter: 0, chosen: [], guessedPairs: [] }, 'xyz').clickCounter,
    ).toBe(1);
  });
});
