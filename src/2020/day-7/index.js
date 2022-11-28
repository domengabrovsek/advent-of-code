module.exports = class Day7 {

  constructor(fileName) {
    this.fileName = fileName;
    this.input = this.parseInput(fileName);
    this.count = 0;
    this.bags = new Set();
    this.bags2 = new Map();
  }

  parseInput(fileName) {
    return require('fs').readFileSync(fileName, { encoding: 'utf8' })
      .split('\n')
      .map(x => x
        .replace('\r', '')
        .replace(/bags|bag|\.|,|\d/g, '')
        .replace(/\s\s+/g, ' ')
        .replace(/[ ]+$/, '')
      )
      .filter(x => !x.includes('no other'));
  }

  formatInnerBags(bags) {
    const innerBags = [];
    const names = bags.trim().split(' ');

    for (let i = 0; i < names.length; i += 2) {
      innerBags.push(`${names[i]} ${names[i + 1]}`);
    }
    return innerBags;
  }

  constructDict() {
    this.dict = new Map();
    this.input.forEach(row => {
      let [outerBag, innerBags] = row.split('contain').map(x => x.trim());
      innerBags = this.formatInnerBags(innerBags);

      innerBags.forEach(innerBag => {
        const value = this.dict.has(innerBag) ? this.dict.get(innerBag) : new Set();
        value.add(outerBag);
        this.dict.set(innerBag, value);
      });
    });

    return this.dict;
  }

  constructBags(bag) {
    this.dict.has(bag) && this.dict.get(bag).forEach(bag => {
      this.bags.add(bag) && this.constructBags(bag);
    })
  }

  countBags(bags) {
    return bags.size;
  }

  constructBagsNumber(bag) {
    this.bags2.has(bag) && this.bags2.get(bag).forEach(bag => {
      this.count += 1;;
      this.constructBagsNumber(bag);
    })
  }

  constructBags2(fileName) {
    require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      .map(row => row
        .replace(/contain/g, '')
        .split(/ bags?./)
        .map(x => x.trim())
        .filter(x => x)
      )
      .filter(row => !row.includes('no other'))
      .forEach(rule => {
        const value = this.bags2.has(rule[0]) ? this.bags2.get(rule[0]) : []
        rule.slice(1).forEach(r => {
          const formula = r.split(/([0-9])/).filter(x => x).map(r => r.trim());
          value.push(...Array(parseInt(formula[0], 10)).fill(formula[1]));
        })
        this.bags2.set(rule[0], value);
      });
  }

  part1(bagToFind) {
    this.dict = this.constructDict(this.input);
    this.constructBags(bagToFind);
    return this.countBags(this.bags);
  }

  part2(bagToFind) {
    this.constructBags2(this.fileName);
    this.constructBagsNumber(bagToFind);
    return this.count;
  }
};