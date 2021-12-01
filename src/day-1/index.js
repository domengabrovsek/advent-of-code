module.exports = class Day1 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
  }

  readInput(fileName) {
    if (!fileName) return;
    return require('fs').readFileSync(fileName, { encoding: 'utf-8' }).split('\n').map(number => parseInt(number));
  }

  countNumberOfIncreasedMeasurements(part) {

    let numberOfIncreases = 0;
    let previousNumber;

    for (let i = 0; i < this.input.length; i++) {

      // for part 1 take just the number
      // for part 2 take 3 numbers and compare sum
      const number = part === 1
        ? this.input[i]
        : this.input[i] + this.input[i + 1] + this.input[i + 2];

      if (previousNumber) {
        if (previousNumber < number) {
          numberOfIncreases++;
        }
      }

      previousNumber = number;
    }

    return numberOfIncreases;
  }
}