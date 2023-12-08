import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { solveOne, solveTwo, getCardType, getCardTypeWithJokers, compareHands } from '../../src/2023/07/index';

describe('2023-07', () => {

  const input = readFileSync('./src/2023/07/input.txt', 'utf8');

  it('part 1', () => {
    const result = solveOne(input);
    expect(result).toBe(256448566); // 256448566 6440
  });

  it('part 2', () => {
    const result = solveTwo(input);
    expect(result).toBe(254412181); // 254412181 5905
  });
});

describe('2023-07 compareHands', () => {

  const testCases = [
    { handOne: 'QJJQ2', handTwo: 'QJJQJ', expected: 1 },
    { handOne: 'JJJJJ', handTwo: '22222', expected: 2 },
    { handOne: 'KJJJJ', handTwo: '22222', expected: 1 },
    { handOne: 'KJJJJ', handTwo: 'K2222', expected: 2 },
  ];

  testCases.forEach(({ handOne, handTwo, expected }) => {
    it(`should return ${expected} for ${handOne} - ${handTwo}`, () => {
      const result = compareHands(handOne, handTwo, true);
      expect(result).toBe(expected);
    });
  });
});

describe('2023-07 getCardType', () => {

  const highCardTestCases = [
    { hand: 'A2345', expected: 1 },
    { hand: 'KQJT9', expected: 1 },
    { hand: 'QJT98', expected: 1 },
    { hand: 'JT876', expected: 1 },
    { hand: 'T8765', expected: 1 },
    { hand: '98765', expected: 1 },
    { hand: '87654', expected: 1 },
    { hand: '76543', expected: 1 },
    { hand: '65432', expected: 1 },
    { hand: '5432A', expected: 1 }
  ];

  highCardTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for high card hand ${hand}`, () => {
      const result = getCardType(hand);
      expect(result).toBe(expected);
    });
  });

  const onePairTestCases = [
    { hand: 'AA234', expected: 2 },
    { hand: 'KKQJ9', expected: 2 },
    { hand: 'QQJT8', expected: 2 },
    { hand: 'JJT87', expected: 2 },
    { hand: 'TT876', expected: 2 },
    { hand: '99876', expected: 2 },
    { hand: '88765', expected: 2 },
    { hand: '74657', expected: 2 },
    { hand: '66543', expected: 2 },
    { hand: '45Q34', expected: 2 }
  ];

  onePairTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for one pair hand ${hand}`, () => {
      const result = getCardType(hand);
      expect(result).toBe(expected);
    });
  });

  const twoPairTestCases = [
    { hand: 'K23K2', expected: 3 },
    { hand: 'A3KA3', expected: 3 },
    { hand: 'Q6Q26', expected: 3 },
    { hand: 'T8T8J', expected: 3 },
    { hand: '99JKK', expected: 3 },
    { hand: '8AQ8A', expected: 3 },
    { hand: '6767T', expected: 3 },
    { hand: 'Q454Q', expected: 3 },
    { hand: 'A323A', expected: 3 },
    { hand: 'A2A2K', expected: 3 }
  ];

  twoPairTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for two pair hand ${hand}`, () => {
      const result = getCardType(hand);
      expect(result).toBe(expected);
    });
  });


  const fullHouseTestCases = [
    { hand: 'A2A2K', expected: 3 },
    { hand: 'K3QKQ', expected: 3 },
    { hand: 'T9J9T', expected: 3 },
    { hand: '8A82A', expected: 3 },
    { hand: '7Q76Q', expected: 3 },
    { hand: '45K5K', expected: 3 },
    { hand: '3A4A3', expected: 3 },
    { hand: '9J2J9', expected: 3 },
    { hand: 'T6Q6T', expected: 3 },
    { hand: '2K5K2', expected: 3 }
  ];

  fullHouseTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for full house hand ${hand}`, () => {
      const result = getCardType(hand);
      expect(result).toBe(expected);
    });
  });

});

describe('2023-07 getCardTypeWithJokers', () => {

  const highCardTestCases = [
    { hand: 'A2345', expected: 1 },
    { hand: 'KQJT9', expected: 2 },
    { hand: 'QJT98', expected: 2 },
    { hand: 'JT876', expected: 2 },
    { hand: 'T8765', expected: 1 },
    { hand: '98765', expected: 1 },
    { hand: '87654', expected: 1 },
    { hand: '76543', expected: 1 },
    { hand: '65432', expected: 1 },
    { hand: '5432A', expected: 1 }
  ];

  highCardTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for high card hand ${hand}`, () => {
      const result = getCardTypeWithJokers(hand);
      expect(result).toBe(expected);
    });
  });

  const onePairTestCases = [
    { hand: 'AA234', expected: 2 },
    { hand: 'KKQJ9', expected: 4 },
    { hand: 'QQJT8', expected: 4 },
    { hand: 'JJT87', expected: 4 },
    { hand: 'TT876', expected: 2 },
    { hand: '99876', expected: 2 },
    { hand: '88765', expected: 2 },
    { hand: '74657', expected: 2 },
    { hand: '66543', expected: 2 },
    { hand: '45Q34', expected: 2 }
  ];

  onePairTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for one pair hand ${hand}`, () => {
      const result = getCardTypeWithJokers(hand);
      expect(result).toBe(expected);
    });
  });

  const twoPairTestCases = [
    { hand: 'K23K2', expected: 3 },
    { hand: 'A3KA3', expected: 3 },
    { hand: 'Q6Q26', expected: 3 },
    { hand: 'T8T8J', expected: 5 },
    { hand: '99JKK', expected: 5 },
    { hand: '8AQ8A', expected: 3 },
    { hand: '6767T', expected: 3 },
    { hand: 'Q454Q', expected: 3 },
    { hand: 'A323A', expected: 3 },
    { hand: 'A2A2K', expected: 3 }
  ];

  twoPairTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for two pair hand ${hand}`, () => {
      const result = getCardTypeWithJokers(hand);
      expect(result).toBe(expected);
    });
  });


  const fullHouseTestCases = [
    { hand: 'A2A2K', expected: 3 },
    { hand: 'K3QKQ', expected: 3 },
    { hand: 'T9J9T', expected: 5 },
    { hand: '8A82A', expected: 3 },
    { hand: '7Q76Q', expected: 3 },
    { hand: '45K5K', expected: 3 },
    { hand: '3A4A3', expected: 3 },
    { hand: '9J2J9', expected: 6 },
    { hand: 'T6Q6T', expected: 3 },
    { hand: '2K5K2', expected: 3 }
  ];

  fullHouseTestCases.forEach(({ hand, expected }) => {
    it(`should return ${expected} for full house hand ${hand}`, () => {
      const result = getCardTypeWithJokers(hand);
      expect(result).toBe(expected);
    });
  });

});