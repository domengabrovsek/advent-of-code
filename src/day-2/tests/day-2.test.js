const Day2 = require('../index');

describe('tests for day 2 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 2120749, expectedResult2: 2138382217 },
    { file: 'input-test.txt', expectedResult1: 150, expectedResult2: 900 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const day2 = new Day2(inputFile);
      const result1 = day2.getPosition(1);

      day2.reset();
      const result2 = day2.getPosition(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});