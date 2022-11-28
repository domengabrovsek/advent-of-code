// https://adventofcode.com/2019/day/2

const { deepCopy } = require('../helpers/helpers');

// function to calculate new state from old state and return first value of new state
const calculateNewState = (originalInput, noun, verb) => {

  let input = deepCopy(originalInput);

  if (noun && verb) {
    input = restoreGravityAssistProgram(input, noun, verb);
  }

  for (let i = 0; i < input.length; i += 4) {
    const opCode = parseInt(input[i]);
    const firstValue = parseInt(input[input[i + 1]])
    const secondValue = parseInt(input[input[i + 2]])
    const destination = parseInt(input[i + 3])

    switch (opCode) {
      case 1: {
        input[destination] = firstValue + secondValue;
        break;
      }
      case 2: {
        input[destination] = firstValue * secondValue;
        break;
      }
      case 99: {
        return input[0];
      }
      default: {
        throw new Error(`Unsupported opcode: ${opCode} at position ${i}`);
      }
    }
  }
}

const calculateNounAndVerb = (input, expectedOutput) => {

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {

      const result = calculateNewState(input, noun, verb);

      if (result === expectedOutput) {
        return { verb, noun }
      }
    }
  }
}

// function to restore gravity assist program (switch certain values with provided predefined values)
const restoreGravityAssistProgram = (input, noun, verb) => {
  input[1] = noun;
  input[2] = verb;

  return input;
}

module.exports = {
  calculateNewState,
  restoreGravityAssistProgram,
  calculateNounAndVerb
}