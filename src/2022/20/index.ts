/* This file contains solution for AoC puzzle day 20 */

export const solveOne = (input: string) => {

  const numbers = input.split('\n').map(num => parseInt(num));
  const items = numbers.map((number, index) => ({ number, index }));

  for (let i = 0; i < numbers.length; i++) {
    const indexToRemove = items.findIndex(item => item.index === i);
    items.splice(indexToRemove, 1);

    const newIndex = (numbers[i] + indexToRemove) % items.length;
    const item = { number: numbers[i], index: i };

    items.splice(newIndex, 0, item);
  }

  const indexes = [1000, 2000, 3000];
  const zeroIndex = items.findIndex(x => x.number === 0);
  const result = indexes.reduce((a, b) => a + items[(b + zeroIndex) % items.length].number, 0);

  return result;
}

export const solveTwo = (input: string) => {

  const decryptionKey = 811589153;
  const numbers = input.split('\n').map(num => parseInt(num) * decryptionKey);
  const items = numbers.map((number, index) => ({ number, index }));
  const timesToMix = 10;

  for (let j = 0; j < timesToMix; j++) {
    for (let i = 0; i < numbers.length; i++) {
      const indexToRemove = items.findIndex(item => item.index === i);
      items.splice(indexToRemove, 1);

      const newIndex = (numbers[i] + indexToRemove) % items.length;
      const item = { number: numbers[i], index: i };

      items.splice(newIndex, 0, item);
    }
  }

  const indexes = [1000, 2000, 3000];
  const zeroIndex = items.findIndex(item => item.number === 0);
  const result = indexes.reduce((a, b) => a + items[(b + zeroIndex) % items.length].number, 0);

  return result;
}