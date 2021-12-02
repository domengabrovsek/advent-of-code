module.exports = class Day3 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
  }

  readInput(fileName) {
    if (!fileName) return;
    return require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
  }

}