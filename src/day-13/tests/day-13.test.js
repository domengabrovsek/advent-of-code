const Day13 = require('../index');

describe('tests for day 13 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 745, expectedResult2: 268 },
    { file: 'input-test.txt', expectedResult1: 17, expectedResult2: 195 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day13(inputFile).solve(1);
      new Day13(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
    })
  })
});