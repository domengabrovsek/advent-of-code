const Day10 = require('../index');

describe('tests for day 10 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 366027, expectedResult2: 1118645287 },
    { file: 'input-test.txt', expectedResult1: 26397, expectedResult2: 288957 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day10(inputFile).solve(1);
      const result2 = new Day10(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});