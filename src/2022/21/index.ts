/* This file contains solution for AoC puzzle day 21 */

const parseInput = (input: string) => {

  const monkeys: any = {};

  input.split('\n').forEach(row => {

    const [left, right] = row.split(':');

    if (right.split('').some(r => ['+', '-', '*', '/', '='].includes(r))) {
      const [op1, sign, op2] = right.split(' ').filter(Boolean);

      monkeys[left] = { op1, op2, sign };

    } else {
      monkeys[left] = parseInt(right);
    }

  });

  return monkeys;
};

export const solveOne = (input: string) => {

  const monkeys = parseInput(input);

  while (true) {

    for (const key of Object.keys(monkeys)) {
      const value = monkeys[key];

      if (typeof value === 'number') {
        continue;
      }

      const { op1, op2, sign } = value;

      try {
        const newValue = eval(`${monkeys[op1]} ${sign} ${monkeys[op2]}`);
        monkeys[key] = newValue;
      } catch (error) { }
    }

    if (Object.keys(monkeys).map(key => monkeys[key]).every(x => typeof x === 'number')) {
      break;
    }
  }

  return monkeys['root'];
};

export const solveTwo = (input: string) => {
  // TODO: implement
};