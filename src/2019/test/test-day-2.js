const path = require('path');
const { expect } = require('chai');

const { calculateNewState, calculateNounAndVerb } = require('../day-2/index');
const { readFileAndSplitByComma } = require('../helpers/helpers');
const input = readFileAndSplitByComma(path.join(__dirname, '../', 'day-2', 'input.txt'));

describe('day-2 tests', () => {

  const testCases = [
    { input: [1, 0, 0, 0, 99], expectedResult: 2 },
    { input: [2, 3, 0, 3, 99], expectedResult: 2 },
    { input: [2, 4, 4, 5, 99, 0], expectedResult: 2 },
    { input: [1, 1, 1, 4, 99, 5, 6, 0, 99], expectedResult: 30 },
    { input: input, noun: 12, verb: 2, expectedResult: 6087827 }
  ]

  testCases.forEach(tc => {
    it(`'calculate value on first position in new state' - ${tc.input} should become ${tc.expectedResult}`, () => {
      const result = calculateNewState(tc.input, tc.noun, tc.verb)
      expect(result).to.be.deep.equal(tc.expectedResult);
    })
  });

  it('calculate noun and verb for output', () => {
    const expectedOutput = 19690720;
    const { verb, noun } = calculateNounAndVerb(input, expectedOutput);

    const result = 100 * noun + verb;

    expect(verb).to.be.equal(79)
    expect(noun).to.be.equal(53)
    expect(result).to.be.equal(5379);
  })
})
