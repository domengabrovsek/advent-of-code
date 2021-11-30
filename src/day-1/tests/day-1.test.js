const Day1 = require('../index');

describe('tests for day 1 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: '', expectedResult2: '' },
    { file: 'input-test.txt', expectedResult1: '', expectedResult2: '' },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;
    })
  })
});