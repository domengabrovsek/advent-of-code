/* This file contains solution for AoC puzzle day 13 */

const parsePairs = (input: string) => {

  const rows = input.split('\n');
  const pairs = [];

  while (rows.length > 0) {

    const one = JSON.parse(rows.shift());
    const two = JSON.parse(rows.shift());

    pairs.push([one, two]);

    // throw out empty line
    rows.shift();
  }

  return pairs;
}

const compareObjects = (left: any, right: any) => left && right && JSON.stringify(left) === JSON.stringify(right);

const calculateDecoderKey = (pairs: number[], dividerPacketOne: number[][], dividerPacketTwo: number[][]) => {

  const packets = [dividerPacketOne, dividerPacketTwo, ...pairs]
    .sort((left, right) => {
      const result = compare(left, right);
      return result === undefined ? 0 : result ? -1 : 1;
    })

  const decoderKey = [dividerPacketOne, dividerPacketTwo]
    .reduce((a: number, b: number[][]) => a * (1 + packets
      .findIndex(p => compareObjects(p, b))), 1);

  return decoderKey;
}

const compare = (left: any, right: any): boolean | undefined => {

  // if both are numbers
  if (typeof left === 'number' && typeof right === 'number') {
    return left > right ? false : left < right ? true : undefined;
  }

  // if one is array and one is number
  else if ((Array.isArray(left) && typeof right === 'number') || (Array.isArray(right) && typeof left === 'number')) {
    return compare(Array.isArray(left) ? left : [left], Array.isArray(right) ? right : [right]);
  }

  // if both are arrays
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    // if left is shorter
    if (left[i] === undefined) {
      return true;
    }

    // if right is shorter 
    if (right[i] === undefined) {
      return false;
    }

    const result = compare(left[i], right[i]);

    if (result !== undefined) {
      return result;
    }
  }
}

export const solveOne = (input: string) => {

  const pairs = parsePairs(input);
  const correctPairIndices: number[] = [];

  for (let [index, pair] of pairs.entries()) {
    const [left, right] = pair;
    if (compare(left, right)) {
      correctPairIndices.push(index + 1)
    }
  }

  const sum = correctPairIndices.reduce((a, b) => a + b, 0);
  return sum;
}

export const solveTwo = (input: string) => {

  const pairs = parsePairs(input).flatMap(pair => pair);
  const dividerPacketOne = [[2]];
  const dividerPacketTwo = [[6]];
  const decoderKey = calculateDecoderKey(pairs, dividerPacketOne, dividerPacketTwo);
  return decoderKey;
}