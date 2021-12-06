const Day6 = require('../index');

describe('tests for day 6 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 396210, expectedResult2: 1770823541496 },
    { file: 'input-test.txt', expectedResult1: 5934, expectedResult2: 26984457539 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day6(inputFile).solve(1);
      const result2 = new Day6(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});