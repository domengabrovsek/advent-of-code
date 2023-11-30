/* This file contains solution for AoC puzzle day 11 */

const parseInput = (input: string) => {
  const rows = input.split('\n');
  const monkeys = [];

  console.log('start');

  while (rows.length > 0) {

    const monkey = {
      monkeyId: parseInt(rows.shift().match(/\d/)[0]),
      startingItems: rows.shift().split(':')[1].split(',').map(num => parseInt(num.trim())),
      operation: rows.shift().split('=')[1].trim().split(' '),
      test: parseInt(rows.shift().match(/\d{1,3}/)[0]),
      conditionTrue: parseInt(rows.shift().match(/\d{1,3}/)[0]),
      conditionFalse: parseInt(rows.shift().match(/\d{1,3}/)[0]),
      itemsInspected: 0
    };

    monkeys.push(monkey);

    // throw out empty line
    rows.shift();
  }

  return monkeys;
};

const applyOperation = (item: number, operation: string, param: string) => {

  const value = param === 'old' ? item : parseInt(param);

  switch (operation) {
    case '*': return item *= value;
    case '/': return item /= value;
    case '+': return item += value;
    case '-': return item -= value;
  }
};

export const solveOne = (input: string) => {

  const monkeys = parseInput(input);
  const rounds = 20;

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {

      if (monkey.startingItems.length === 0) {
        continue;
      }

      // inspect starting items in order
      // update worry level according to operation
      monkey.startingItems = monkey.startingItems.map(item => {
        monkey.itemsInspected++;
        const op = monkey.operation[1];
        const param = monkey.operation[2];
        return applyOperation(item, op, param);
      });

      // update worry level (divide by 3 and round down)
      monkey.startingItems = monkey.startingItems.map(item => {
        return Math.floor(item /= 3);
      });

      // check worry level with test and decide where to throw the item
      monkey.startingItems.forEach(item => {
        const throwDestionation = item % monkey.test === 0 ? monkey.conditionTrue : monkey.conditionFalse;
        monkeys[throwDestionation].startingItems.push(item);
      });

      monkey.startingItems = [];
    }
  }

  // 2 most active monkeys multiplied
  const monkeyBusiness = monkeys
    .map(monkey => monkey.itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);

  return monkeyBusiness;
};

export const solveTwo = (input: string) => {

  const monkeys = parseInput(input);
  const rounds = 10000;
  const mod = monkeys.reduce((a, b) => a * b.test, 1);

  for (let i = 1; i <= rounds; i++) {
    for (const monkey of monkeys) {

      if (monkey.startingItems.length === 0) {
        continue;
      }

      // inspect starting items in order
      // update worry level according to operation
      monkey.startingItems = monkey.startingItems.map(item => {
        monkey.itemsInspected++;
        const op = monkey.operation[1];
        const param = monkey.operation[2];
        return applyOperation(item, op, param);
      });

      // update worry level (divide by 3 and round down)
      monkey.startingItems = monkey.startingItems.map(item => {
        return Math.floor(item %= mod);
      });

      // check worry level with test and decide where to throw the item
      monkey.startingItems.forEach(item => {
        const throwDestionation = item % monkey.test === 0 ? monkey.conditionTrue : monkey.conditionFalse;
        monkeys[throwDestionation].startingItems.push(item);
      });

      monkey.startingItems = [];
    }
  }

  // 2 most active monkeys multiplied
  const monkeyBusiness = monkeys
    .map(monkey => monkey.itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);

  return monkeyBusiness;
};