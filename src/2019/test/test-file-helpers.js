const { expect } = require('chai');
const path = require('path');
const { readFileAndSplitByComma, deepCopy } = require('../helpers/helpers');

describe('helpers tests', () => {

  it('should read file and split contents by comma', () => {

    const input = path.join(__dirname, 'test-files', 'input.txt')
    const result = readFileAndSplitByComma(input);

    expect(result).to.be.deep.equal(["1", "0", "0", "3", "1", "1", "2"])

  })

  it('test deepcopy, a should have same values as b but should not be same object', () => {

    const a = { a: 10, b: 20, c: 30 };
    const b = deepCopy(a);

    expect(a).to.be.deep.equal(b);
    expect(a === b).to.be.false;

  })
})