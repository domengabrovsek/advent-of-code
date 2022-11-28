const Day5 = require('../index');

describe('tests for day 5 challenge', () => {

  const testCases = [
    // { file: 'input.txt', expectedResult1: 7142, expectedResult2: 20012 },
    { file: 'input-test.txt', expectedResult1: 5, expectedResult2: 12 },
  ];

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const result1 = new Day5(inputFile).solve(1);
      const result2 = new Day5(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    });
  });
});
