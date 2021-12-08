module.exports = class Day8 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split('\n')
        .map(line => line.split('|').map(part => part.trim()));

  }

  solve(part) {
    if (part === 1) {
      return this.input
        .map(line => line[1].split(' '))
        .flatMap(digit => digit)
        .filter(digit => [2, 3, 4, 7].includes(digit.length))
        .length;
    }
  }
}