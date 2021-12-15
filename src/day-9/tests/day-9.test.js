const Day9 = require('../index');

describe('tests for day 9 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 528, expectedResult2: 920448 },
    { file: 'input-test.txt', expectedResult1: 15, expectedResult2: 1134 },
  ];

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const result1 = new Day9(inputFile).solve(1);
      const result2 = new Day9(inputFile).solve(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    });
  });
});
