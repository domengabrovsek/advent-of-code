const Day14 = require('../index');

describe('tests for day 14 challenge', () => {

  const testCases = [
    // { file: 'input.txt', expectedResult1: 2170, expectedResult2: 268 },
    { file: 'input-test.txt', expectedResult1: 1588, expectedResult2: 2188189693529 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day14(inputFile).solve(1);
      // const result2 = new Day14(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      // expect(result2).toBe(tc.expectedResult2);
    });

    test('test convert', () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day14(inputFile).convert('NNCB');
      const result2 = new Day14(inputFile).convert('NCNBCHB');
      const result3 = new Day14(inputFile).convert('NBCCNBBBCBHCB');
      const result4 = new Day14(inputFile).convert('NBBBCNCCNBBNBNBBCHBHHBCHB');

      // assert
      expect(result1).toBe('NCNBCHB');
      expect(result2).toBe('NBCCNBBBCBHCB');
      expect(result3).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB');
      expect(result4).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');

    })
  })
});