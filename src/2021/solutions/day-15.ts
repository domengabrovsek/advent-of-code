/* This file contains solution for AoC puzzle day 15 */

import { getYear, getDay, getInput } from '../../utils/utils';

interface GraphNode {
  x: number,
  y: number,
  risk: number
}

const getNeigbhours = (caveGraph: number[][], currentNode: GraphNode) => {

  const neighbours: GraphNode[] = [];

  const { x, y } = currentNode;

  const left = caveGraph?.[x - 1]?.[y];
  const right = caveGraph?.[x + 1]?.[y];
  const up = caveGraph?.[x]?.[y - 1];
  const down = caveGraph?.[x]?.[y + 1];

  if (left) {
    neighbours.push({ x: x - 1, y, risk: left });
  }

  if (right) {
    neighbours.push({ x: x + 1, y, risk: right });
  }

  if (up) {
    neighbours.push({ x, y: y - 1, risk: up });
  }

  if (down) {
    neighbours.push({ x, y: y + 1, risk: down });
  }

  return neighbours;
};

const getShortestPath = (graph: number[][], startNode: GraphNode, end: GraphNode) => {

  const nodesToVisit: GraphNode[] = [startNode];
  const visitedNodes: GraphNode[] = [];

  while (nodesToVisit.length > 0) {

    nodesToVisit.sort((a, b) => a.risk - b.risk);

    const currentNode: GraphNode = nodesToVisit.shift();
    let totalRisk = currentNode.risk;

    const neighbours = getNeigbhours(graph, currentNode);

    for (const neighbour of neighbours) {

      // if this is the last node
      if (neighbour.x === end.x && neighbour.y === end.y) {
        totalRisk += neighbour.risk;
        return totalRisk - startNode.risk;
      }

      // if we haven't visited these nodes yet
      if (!visitedNodes.find(node => node.x === neighbour.x && node.y === neighbour.y)) {
        nodesToVisit.push(neighbour);
        neighbour.risk += totalRisk;
        visitedNodes.push(neighbour);
      }
    }
  }
};

const generateFullMap = (originalArray: number[][]) => {

  const originalSize = originalArray.length;
  const size = originalSize * 5;

  const newMap: number[][] = [];

  for (let i = 0; i < size; i++) {
    newMap.push([]);
    for (let j = 0; j < size; j++) {

      let value = originalArray[i % originalSize][j % originalSize];
      const previousValue = newMap?.[i]?.[j - originalSize] || newMap?.[i - originalSize]?.[j];

      if (previousValue) {
        value = (previousValue + 1) > 9 ? 1 : (previousValue + 1);
      }

      newMap[i][j] = value;
    }
  }

  return newMap;
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  // parse input to create a 2D array of coordinates
  const caveGraph: number[][] = input.split('\n').map(row => row.split('').map(_ => Number(_)));
  const size = caveGraph.length - 1;

  const start: GraphNode = { x: 0, y: 0, risk: caveGraph[0][0] };
  const end: GraphNode = { x: size, y: size, risk: caveGraph[size][size] };

  const result = getShortestPath(caveGraph, start, end);

  return result;
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  // parse input to create a 2D array of coordinates
  const caveGraph: number[][] = input.split('\n').map(row => row.split('').map(_ => Number(_)));

  // generate the whole map 
  const fullCaveGraph = generateFullMap(caveGraph);
  const size = fullCaveGraph.length - 1;

  const start: GraphNode = { x: 0, y: 0, risk: fullCaveGraph[0][0] };
  const end: GraphNode = { x: size, y: size, risk: fullCaveGraph[size][size] };

  const result = getShortestPath(fullCaveGraph, start, end);

  return result;
};
