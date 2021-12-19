import PriorityQueue from 'js-priority-queue';
import { Matrix, readInputToMatrix } from '../shared/io';

type Position = {
  totalDistance: number;
  x: number;
  y: number;
};

type BuildMapFn = (matrix: Matrix) => Matrix;

const part1: BuildMapFn = (matrix: Matrix) => matrix;

const part2: BuildMapFn = (matrix: Matrix) => {
  const map: number[][] = [];

  // Multiply columns
  for (let y = 0; y < matrix[0].length; y++) {
    const row = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        const newValue = matrix[y][j] + i;
        row.push(newValue > 9 ? (newValue % 10) + 1 : newValue);
      }
    }

    map.push(row);
  }

  // Multiply rows
  const finalMap: number[][] = [];
  for (let i = 0; i < 5; i++) {
    for (const row of map) {
      const updatedRow = row.map((number) => {
        const newValue = number + i;
        return newValue > 9 ? (newValue % 10) + 1 : newValue;
      });
      finalMap.push(updatedRow);
    }
  }

  return finalMap;
};

const day15 = (buildMapFn: BuildMapFn) => {
  const map = buildMapFn(readInputToMatrix('day15'));
  const maxX = map.length - 1;
  const maxY = map[0].length - 1;
  const visited = new Set<string>();

  const queue = new PriorityQueue<Position>({ comparator: (a, b) => a.totalDistance - b.totalDistance });

  queue.queue({ totalDistance: 0, x: 0, y: 0 });

  while (queue.length !== 0) {
    const { x, y, totalDistance } = queue.dequeue();
    if (x === maxX && y === maxY) return totalDistance;

    const key = `${x}-${y}`;
    if (!visited.has(key)) {
      visited.add(key);
      if (x - 1 > 0) queue.queue({ x: x - 1, y, totalDistance: totalDistance + map[x - 1][y] });
      if (x + 1 <= maxX) queue.queue({ x: x + 1, y, totalDistance: totalDistance + map[x + 1][y] });
      if (y - 1 > 0) queue.queue({ x, y: y - 1, totalDistance: totalDistance + map[x][y - 1] });
      if (y + 1 <= maxY) queue.queue({ x, y: y + 1, totalDistance: totalDistance + map[x][y + 1] });
    }
  }

  throw new Error('Path not found');
};

console.log('Day 15 - Part 1', day15(part1));
console.log('Day 15 - Part 2', day15(part2));
