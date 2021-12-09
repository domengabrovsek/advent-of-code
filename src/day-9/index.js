module.exports = class Day9 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split('\n')
        .map(x => x.split('').map(Number))
  }

  solve(part) {

    const lowPoints = [];

    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[0].length; j++) {

        const current = this.input[i][j];
        const upper = this.input?.[i]?.[j - 1];
        const lower = this.input?.[i]?.[j + 1];
        const left = this.input?.[i - 1]?.[j];
        const right = this.input?.[i + 1]?.[j];

        const points = [upper, lower, left, right].filter(x => x !== undefined);

        if (current < Math.min(...points)) {
          lowPoints.push(current);
        }

      }
    }

    return lowPoints.reduce((x, y) => x + y, 0) + lowPoints.length;

  }
}