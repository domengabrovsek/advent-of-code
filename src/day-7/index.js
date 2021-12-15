module.exports = class Day7 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) { return; }
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split(',')
        .map(Number);
  }

  stepCost(position, number, part) {

    const cost = Math.abs(position - number);

    if (part === 1) { return cost; }

    let sum = 0;

    for (let i = 0; i < cost; i++) {
      sum += i;
    }

    return cost + sum;
  }

  getPositionsToCheck() {
    const inputNumbers = Array.from(new Set(this.input));
    const max = Math.max(...inputNumbers);
    const min = Math.min(...inputNumbers);

    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  solve(part) {
    return Math
      .min(...this.getPositionsToCheck()
        .map(position => this.input
          .map(crab => this.stepCost(position, crab, part))
          .reduce((x, y) => x + y, 0))
      );
  }
};
