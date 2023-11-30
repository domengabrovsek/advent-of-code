/* This file contains solution for AoC puzzle day 3 */

const generateAlphabet = () => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);

  const alphabet: any = {};

  const lower = alpha.map((x) => ({ letter: String.fromCharCode(x), priority: x - 38 }));
  const upper = lower.map((x) => ({ letter: x.letter.toLowerCase(), priority: x.priority - 26 }));

  [...lower, ...upper].forEach(x => alphabet[x.letter] = x.priority);

  return alphabet;
};

export const solveOne = (input: string) => {

  const getCommonLetter = (first: any, second: any) => {
    for (const item1 of first) {
      for (const item2 of second) {
        if (item1 === item2) {
          return item1;
        }
      }
    }
  };

  const rows = input.split('\n');
  const alphabet = generateAlphabet();

  let sum = 0;

  for (const row of rows) {

    const firstPart = row.slice(0, row.length / 2);
    const secondPart = row.slice(row.length / 2, row.length);
    const commonLetter = getCommonLetter(firstPart, secondPart);

    sum += alphabet[commonLetter];
  }

  return sum;
};

export const solveTwo = (input: string) => {

  const getCommonLetter = (first: any, second: any, third: any) => {
    for (const item1 of first) {
      for (const item2 of second) {
        if (item1 == item2) {
          for (const item3 of third) {
            if (item3 == item1) return item3;
          }
        }
      }
    }
  };

  const rows = input.split('\n');
  const alphabet = generateAlphabet();

  let sum = 0;

  for (let i = 0; i < rows.length; i += 3) {

    const firstPart = rows[i];
    const secondPart = rows[i + 1];
    const thirdThird = rows[i + 2];

    sum += alphabet[getCommonLetter(firstPart, secondPart, thirdThird)];
  }

  return sum;
};