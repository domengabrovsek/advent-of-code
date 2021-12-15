/* eslint-disable no-loop-func */
module.exports = class Day3 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
  }

  readInput(fileName) {
    if (!fileName) { return; }
    return require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      .map(x => x.split(''));
  }

  transposeArray(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  }

  getEpsilonRate(gammaRate) {
    const flippedBits = gammaRate.split('').map(bit => {

      let res;

      if (bit === '1') { res = '0'; }
      else if (bit === '0') { res = '1'; }

      return res;
    })
      .join('');

    return flippedBits;
  }

  getGammaRate(input) {
    let gammaRate = '';

    input.forEach(element => {
      const ones = element.filter(bit => bit === '1').length;
      const zeros = element.filter(bit => bit === '0').length;

      gammaRate += ones > zeros
        ? '1'
        : '0';
    });

    return gammaRate;
  }

  getLeastCommonBit(input, column) {
    const bits = this.transposeArray(input)[column];
    const ones = bits.filter(bit => bit === '1').length;
    const zeros = bits.filter(bit => bit === '0').length;

    if (ones > zeros) { return '0'; }
    if (zeros > ones) { return '1'; }
    return '0';
  }

  getMostCommonBit(input, column) {
    const bits = this.transposeArray(input)[column];
    const ones = bits.filter(bit => bit === '1').length;
    const zeros = bits.filter(bit => bit === '0').length;

    if (ones > zeros) { return '1'; }
    if (zeros > ones) { return '0'; }
    return '1';
  }

  getOxGenRate(input) {
    let numbers = Array.from(input);
    let currentBit = 0;

    while (numbers.length !== 1) {
      const mostCommonBit = this.getMostCommonBit(numbers, currentBit);
      numbers = numbers.filter(number => number[currentBit] === mostCommonBit);
      currentBit++;
    }

    const oxGenRate = parseInt(numbers[0].join(''), 2);
    return oxGenRate;
  }

  getCO2ScrubRate(input) {
    let numbers = Array.from(input);
    let currentBit = 0;

    while (numbers.length !== 1) {
      const leastCommonBit = this.getLeastCommonBit(numbers, currentBit);
      numbers = numbers.filter(number => number[currentBit] === leastCommonBit);
      currentBit++;
    }

    return parseInt(numbers[0].join(''), 2);
  }

  part1() {
    const transposedInput = this.transposeArray(this.input);
    const gammaRate = this.getGammaRate(transposedInput);
    const epsilonRate = this.getEpsilonRate(gammaRate);
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  }

  part2() {
    const oxGenRate = this.getOxGenRate(this.input);
    const CO2ScrubRate = this.getCO2ScrubRate(this.input);
    return parseInt(oxGenRate) * parseInt(CO2ScrubRate);
  }

};
