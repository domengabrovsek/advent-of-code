const Day3 = require('../index');

describe('tests for day 3 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 3148794, expectedResult2: 2795310 },
    { file: 'input-test.txt', expectedResult1: 198, expectedResult2: 230 },
  ];

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const day3 = new Day3(inputFile);

      const result1 = day3.part1();
      const result2 = day3.part2();

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    });
  });
});
