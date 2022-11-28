const Day7 = require('../index');

describe('tests for day 7 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 155, expectedResult2: 54803 },
    { file: 'input-1.txt', expectedResult1: 4, expectedResult2: 32 },
    { file: 'input-2.txt', expectedResult1: 5, expectedResult2: 32 }
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const fileName = `${__dirname}/${tc.file}`;
      const day7 = new Day7(fileName);
      const bagToFind = 'shiny gold';

      // act
      const result1 = day7.part1(bagToFind);
      const result2 = day7.part2(bagToFind);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});