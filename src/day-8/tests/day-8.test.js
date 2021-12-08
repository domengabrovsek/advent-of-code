const Day7 = require('../index');

describe('tests for day 7 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 534, expectedResult2: 100148777 },
    { file: 'input-test.txt', expectedResult1: 26, expectedResult2: 168 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const result1 = new Day7(inputFile).solve(1);
      // const result2 = new Day7(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      // expect(result2).toBe(tc.expectedResult2);
    })
  })
});