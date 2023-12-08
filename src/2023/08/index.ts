import { lcm } from '../../utils/math';

type Directions = {
  left: string,
  right: string
}

type LR = 'L' | 'R';

export const solveOne = (input: string) => {
  const map = new Map<string, Directions>();

  const lines = input.split('\n').filter(Boolean);
  const directions = lines.shift().split('') as LR[];

  lines.forEach(line => {
    const node = line.split(' = ')[0];
    const [left, right] = line.split(' = ')[1].replace('(', '').replace(')', '').split(', ');

    map.set(node, { left, right });
  });


  let currentNode = 'AAA';
  let i = 0;

  while (currentNode !== 'ZZZ') {

    const direction = directions[i % directions.length];
    const nextNode = direction === 'L' ? map.get(currentNode).left : map.get(currentNode).right;

    currentNode = nextNode;

    i++;
  }

  return i;

};

export const solveTwo = (input: string) => {
  const map = new Map<string, Directions>();

  const lines = input.split('\n').filter(Boolean);
  const directions = lines.shift().split('') as LR[];

  lines.forEach(line => {
    const node = line.split(' = ')[0];
    const [left, right] = line.split(' = ')[1].replace('(', '').replace(')', '').split(', ');

    map.set(node, { left, right });
  });

  const paths = [];
  const currentNodes = Array.from(map.keys()).filter(node => node[2] === 'A');

  for (let currentNode of currentNodes) {
    let i = 0;
    while (currentNode[2] !== 'Z') {

      const direction = directions[i % directions.length];
      const nextNode = direction === 'L' ? map.get(currentNode).left : map.get(currentNode).right;

      currentNode = nextNode;

      i += 1;
    }

    paths.push(i);
  }

  return lcm(paths);
};

