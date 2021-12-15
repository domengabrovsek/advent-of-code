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

  convert(template) {

    let newTemplate = '';

    for (let j = 0; j < template.length - 1; j++) {
      const first = template?.[j];
      const second = template?.[j + 1];
      const third = this.dict[`${first}${second}`];
      const joined = `${first}${third}`;

      if (first && second) {
        newTemplate += joined;
      }

      if (j === template.length - 2) {
        newTemplate += second;
      }
    }

    return newTemplate;
  }

  getMostLeastCommonElement(template) {
    const uniqueElements = [...new Set(template)];
    const elements = uniqueElements.map(element => ({
      key: element,
      value: template.split('').filter(x => x === element).length
    }));

    const mostCommon = Math.max(...elements.map(x => x.value));
    const leastCommon = Math.min(...elements.map(x => x.value));

    // const mostCommon = elements.find(x => x.value === max);
    // const leastCommon = elements.find(x => x.value === min);

    return { mostCommon, leastCommon };
  }

  solve(part) {


    let steps = part === 1 ? 10 : 40;
    let template = this.template;

    for (let i = 0; i < steps; i++) {
      template = this.convert(template);
    }

    const { mostCommon, leastCommon } = this.getMostLeastCommonElement(template);

    return mostCommon - leastCommon;

  }
}

