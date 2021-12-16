import PriorityQueue from 'js-priority-queue';
import { readInputToMatrix } from '../shared/io';

type Position = {
  totalDistance: number;
  x: number;
  y: number;
};

const day15 = () => {
  const matrix = readInputToMatrix('day15');
  const maxX = matrix.length - 1;
  const maxY = matrix[0].length - 1;
  const visited = new Set<string>();

  const queue = new PriorityQueue<Position>({ comparator: (a, b) => a.totalDistance - b.totalDistance });

  queue.queue({ totalDistance: 0, x: 0, y: 0 });

  while (queue.length !== 0) {
    const { x, y, totalDistance } = queue.dequeue();
    if (x === maxX && y === maxY) return totalDistance;

    const key = `${x}-${y}`;
    if (!visited.has(key)) {
      visited.add(key);
      if (x - 1 > 0) queue.queue({ x: x - 1, y, totalDistance: totalDistance + matrix[x - 1][y] });
      if (x + 1 <= maxX) queue.queue({ x: x + 1, y, totalDistance: totalDistance + matrix[x + 1][y] });
      if (y - 1 > 0) queue.queue({ x, y: y - 1, totalDistance: totalDistance + matrix[x][y - 1] });
      if (y + 1 <= maxY) queue.queue({ x, y: y + 1, totalDistance: totalDistance + matrix[x][y + 1] });
    }
  }

  throw new Error('Path not found');
};

console.log('Day 15 - Part 1', day15());
