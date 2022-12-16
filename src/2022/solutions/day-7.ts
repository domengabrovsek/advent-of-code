/* This file contains solution for AoC puzzle day 7 */

import { getYear, getDay, getInput } from '../../utils/utils';

const getDirectories = (input: string) => {
  const lines = input.split('\n')
    .filter(line => !line.startsWith('$ ls'))
    .filter(line => !line.startsWith('dir'))

  const directories: Record<string, number> = {}
  const current: string[] = [];

  for (let line of lines) {

    const [a, b, c] = line.split(' ');

    if (a === '$') {
      if (c === '..') {
        current.pop();
      } else {
        current.push(c);
      }
    } else {
      const pathArray = [...current];
      while (pathArray.length) {
        const currentPath = pathArray.join('/');
        directories[currentPath] = (directories[currentPath] || 0) + Number(a);
        pathArray.pop();
      }
    }
  }

  return directories;
}


export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const directories = getDirectories(input);

  return Array.from(Object.values(directories)).filter(sum => sum <= 100000).reduce((a, b) => a + b, 0);
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const directories = getDirectories(input);

  return Array.from(Object.values(directories))
    .filter(sum => sum >= 30000000 - (70000000 - directories['/']))
    .sort()[0];
}
