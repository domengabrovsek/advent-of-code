/* This file contains solution for AoC puzzle day 14 */

import { getYear, getDay, getInput } from '../../utils/utils';

const getMostLeastCommonElement = (pairs: any) => {

  // get a list of unique elements
  const uniqueElements = [...new Set(Object.keys(pairs).flatMap(x => x.split('')))];

  const elements: any = {};

  uniqueElements.forEach(x => {
    elements[x] = 0;
  });

  // count number of specific element
  for (const pair of Object.keys(pairs)) {
    for (const element of pair.split('')) {
      elements[element] += pairs[pair] / 2;
    }
  }

  // round them up in case of floats
  for (const x of Object.keys(elements)) {
    elements[x] = Math.round(elements[x]);
  }

  // get most and least common elements
  const mostCommon = Math.max(...Object.keys(elements).map(x => elements[x]));
  const leastCommon = Math.min(...Object.keys(elements).map(x => elements[x]));

  return { mostCommon, leastCommon };
}

const getNewPairs = (pairs: any, mapInstructions: any) => {
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

const getInitialPairs = (template: any) => {
  const pairs: any = {};

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.substr(i, 2);
    pairs[pair] = pairs?.[pair] || 0 + 1;
  }

  return pairs;
}

const getInitialMapInstructions = (dict: any) => {
  const mapInstructions: any = {};

  for (const key of Object.keys(dict)) {
    const [first, second] = key.split('');
    const third = dict[key];
    mapInstructions[key] = [`${first}${third}`, `${third}${second}`];
  }

  return mapInstructions;
}



export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const rows = input.split('\n').filter(Boolean);

  const template = rows.shift();
  const dict = Object.fromEntries(rows.map(row => row.split(' -> ')));

  // initial pairs from input
  let pairs = getInitialPairs(template);

  // initial map instructions from input
  const mapInstructions = getInitialMapInstructions(dict);

  const steps = 10 

  for (let i = 0; i < steps; i++) {
    pairs = getNewPairs(pairs, mapInstructions);
  }

  // get most and least common elements
  const { mostCommon, leastCommon } = getMostLeastCommonElement(pairs);

  return mostCommon - leastCommon;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const rows = input.split('\n').filter(Boolean);

  const template = rows.shift();
  const dict = Object.fromEntries(rows.map(row => row.split(' -> ')));

  // initial pairs from input
  let pairs = getInitialPairs(template);

  // initial map instructions from input
  const mapInstructions = getInitialMapInstructions(dict);

  const steps = 40; 

  for (let i = 0; i < steps; i++) {
    pairs = getNewPairs(pairs, mapInstructions);
  }

  // get most and least common elements
  const { mostCommon, leastCommon } = getMostLeastCommonElement(pairs);

  return mostCommon - leastCommon;
}
