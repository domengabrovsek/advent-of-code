

export const solveOne = (input: string) => {
  // parse input to get numbers
  const numbers = input.split('\n').map(row => row.includes('+') ? Number(row.split('+')[1]) : Number(row));

  // sum number
  const sum = numbers.reduce((sum, curr) => sum + curr, 0);

  return sum;
};

export const solveTwo = (input: string) => {
  // parse input to get numbers
  const numbers = input.split('\n')
    .filter(Boolean)
    .map(row => row.includes('+') ? Number(row.split('+')[1]) : Number(row));

  // const numbers = [1, -2, 3, 1,]; // 2
  // const numbers = [3, 3, 4, -2, -4]; // 10
  // const numbers = [-6, 3, 8, 5, -6]; // 5
  // const numbers = [7, 7, -2, -7, -4]; // 14
  // const numbers = [1, -1]; // 0

  const occurences: any = { 0: 1 };
  let sum = 0;

  while (true) {
    for (const number of numbers) {
      sum += number;

      // we saw it again
      if (occurences[sum]) {
        occurences[sum] += 1;
      }

      // we found the first frequency which occurs twice
      if (occurences[sum] === 2) {
        return sum;
      }

      // this is the first time we saw this frequency occur
      if (occurences[sum] === undefined) {
        occurences[sum] = 1;
      }
    }
  }
};
