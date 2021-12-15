module.exports = class Day14 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;

    const rows = require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean)

    this.template = rows.shift();
    this.dict = Object.fromEntries(rows.map(row => row.split(' -> ')));
  }

  getMostLeastCommonElement(pairs) {

    // get a list of unique elements
    const uniqueElements = [...new Set(Object.keys(pairs).flatMap(x => x.split('')))];

    let elements = {};

    uniqueElements.forEach(x => {
      elements[x] = 0;
    })

    // count number of specific element
    for (const pair of Object.keys(pairs)) {
      for (const element of pair.split('')) {
        elements[element] += pairs[pair] / 2;
      }
    }

    // round them up in case of floats
    for (const x of Object.keys(elements)) {
      elements[x] = Math.round(elements[x])
    }

    // get most and least common elements
    const mostCommon = Math.max(...Object.keys(elements).map(x => elements[x]));
    const leastCommon = Math.min(...Object.keys(elements).map(x => elements[x]));

    return { mostCommon, leastCommon };
  }

  getNewPairs(pairs, mapInstructions) {
    // we need a deep copy
    const newPairs = JSON.parse(JSON.stringify(pairs));

    for (const key of Object.keys(mapInstructions)) {
      const value = pairs[key];

      if (value > 0) {
        newPairs[key] = (newPairs[key] || 0) - value;
        newPairs[mapInstructions[key][0]] = (newPairs[mapInstructions[key][0]] || 0) + value;
        newPairs[mapInstructions[key][1]] = (newPairs[mapInstructions[key][1]] || 0) + value;
      }
    }

    return newPairs;
  }

  getInitialPairs(template) {
    let pairs = {};

    for (let i = 0; i < template.length - 1; i++) {
      const pair = template.substr(i, 2);
      pairs[pair] = pairs?.[pair] || 0 + 1;
    }

    return pairs;
  }

  getInitialMapInstructions(dict) {
    const mapInstructions = {};

    for (const key of Object.keys(dict)) {
      const [first, second] = key.split('');
      const third = dict[key];
      mapInstructions[key] = [`${first}${third}`, `${third}${second}`];
    }

    return mapInstructions;
  }

  solve(part) {

    // initial pairs from input
    let pairs = this.getInitialPairs(this.template);

    // initial map instructions from input
    const mapInstructions = this.getInitialMapInstructions(this.dict);

    // part 1 has 10 steps
    // part 2 has 40 steps
    let steps = part === 1 ? 10 : 40;

    for (let i = 0; i < steps; i++) {
      pairs = this.getNewPairs(pairs, mapInstructions);
    }

    // get most and least common elements
    const { mostCommon, leastCommon } = this.getMostLeastCommonElement(pairs);

    return mostCommon - leastCommon;
  }
}