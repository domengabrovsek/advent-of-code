const Day4 = require('../index');

describe('tests for day 4 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 82440, expectedResult2: 20774 },
    { file: 'input-test.txt', expectedResult1: 4512, expectedResult2: 1924 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day4(inputFile).solve(1);
      const result2 = new Day4(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});