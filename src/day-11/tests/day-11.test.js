const Day11 = require('../index');

describe('tests for day 11 challenge', () => {

  const testCases = [
    // { file: 'input.txt', expectedResult1: 366027, expectedResult2: 1118645287 },
    { file: 'input-test.txt', expectedResult1: 1656, expectedResult2: 288957 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day11(inputFile).solve(1);
      // const result2 = new Day11(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      // expect(result2).toBe(tc.expectedResult2);
    })
  })
});