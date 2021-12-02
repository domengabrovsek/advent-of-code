const Day3 = require('../index');

describe('tests for day 3 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 2120749, expectedResult2: 2138382217 },
    { file: 'input-test.txt', expectedResult1: 150, expectedResult2: 900 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act 
      const day2 = new Day3(inputFile);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      // expect(result2).toBe(tc.expectedResult2);
    })
  })
});