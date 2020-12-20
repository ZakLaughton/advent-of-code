import { countCharacterOccurrencesInString } from './p1-code';

describe('countCharacterOccurrences', () => {
  it('returns the proper number of characters', () => {
    const result = countCharacterOccurrencesInString({
      character: 'a',
      string: 'aaijakjakjlka',
    });
    expect(result).toEqual(5);
  });
});
