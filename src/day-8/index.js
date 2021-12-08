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
        .map(line => line
          .split('|')
          .map(part => part.trim()));

  }

  decodeDigit(digit) {

    if (digit.length === 7) return 8;
    if (digit.length === 4) return 4;
    if (digit.length === 3) return 7;
    if (digit.length === 2) return 1;

    const enabledParts = digit.split('').map(part => this.instructions[part]).sort().join('');

    switch (enabledParts) {
      case '012356': return 9;
      case '012456': return 0;
      case '02346': return 2;
      case '02356': return 3;
      case '01356': return 5;
      case '013456': return 6;
    }
  }

  decodeDigits(digits) {
    return digits.split(' ').map(digit => this.decodeDigit(digit)).join('');
  }

  getCommonElement(arrays) {
    return arrays.shift().filter(v => arrays.every(a => a.indexOf(v) !== -1));
  }

  decodeInstructions(input) {
    //   0:      1:      2:      3:      4:
    //  aaaa    ....    aaaa    aaaa    ....
    // b    c  .    c  .    c  .    c  b    c
    // b    c  .    c  .    c  .    c  b    c
    //  ....    ....    dddd    dddd    dddd
    // e    f  .    f  e    .  .    f  .    f
    // e    f  .    f  e    .  .    f  .    f
    //  gggg    ....    gggg    gggg    ....

    //   5:      6:      7:      8:      9:
    //  aaaa    aaaa    aaaa    aaaa    aaaa
    // b    .  b    .  .    c  b    c  b    c
    // b    .  b    .  .    c  b    c  b    c
    //  dddd    dddd    ....    dddd    dddd
    // .    f  e    f  .    f  e    f  .    f
    // .    f  e    f  .    f  e    f  .    f
    //  gggg    gggg    ....    gggg    gggg

    const instructions = input.split(' ');
    const dict = {}

    let key;

    // 1, 3, 4, 7 can be decoded just by using the length

    const one = instructions
      .find(x => x.length === 2)
      .split('')
      .sort()
      .join('');

    const seven = instructions
      .find(x => x.length === 3)
      .split('')
      .sort()
      .join('');

    const four = instructions
      .find(x => x.length === 4)
      .split('')
      .sort()
      .join('');

    const eight = instructions
      .find(x => x.length === 7)
      .split('')
      .sort()
      .join('');

    // start the process of elimination to get all parts of the digits

    // 0
    key = seven.split('')
      .filter(x => !one.includes(x))[0] // exclude all from 1
    dict[key] = 0;

    // 6
    key = this.getCommonElement(instructions
      .filter(x => x.length === 5) // 2, 3, 5
      .map(x => x.split('')))
      .filter(x => !four.includes(x)) // exclude all from 4
      .filter(x => !seven.includes(x))[0]; // exclude all from 7
    dict[key] = 6;

    // 3
    key = this.getCommonElement(instructions
      .filter(x => x.length === 5) // 2, 3, 5
      .map(x => x.split('')))
      .filter(x => ![key].includes(x)) // exclude all from 6
      .filter(x => !seven.includes(x))[0]; // exclude all from 7
    dict[key] = 3;

    // 1
    key = four.split('')
      .filter(x => !seven.includes(x)) // exclude all from 7
      .filter(x => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 3, 6

    dict[key] = 1;

    // 5
    key = this.getCommonElement(instructions
      .filter(x => x.length === 6) // 6, 9
      .map(x => x.split('')))
      .filter(x => !Object.keys(dict).includes(x))[0]; // exclude all from current dict

    dict[key] = 5;

    // 4
    key = eight.split('')
      .filter(x => !four.includes(x)) // exclude all from 4
      .filter(x => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 2, 3, 5, 6

    dict[key] = 4;

    // 2
    key = eight.split('')
      .filter(x => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 2, 3, 5, 6
    dict[key] = 2;

    return dict;
  }

  solve(part) {
    if (part === 1) {
      return this.input
        .map(line => line[1].split(' '))
        .flatMap(digit => digit)
        .filter(digit => [2, 3, 4, 7].includes(digit.length))
        .length;
    }

    if (part === 2) {
      let sum = 0;

      this.input.forEach(line => {
        const [left, right] = line;

        // instructions to decode digits
        this.instructions = this.decodeInstructions(left);

        // decode the digits and add it to sum
        sum += parseInt(this.decodeDigits(right));
      })

      return sum;
    }
  }
}