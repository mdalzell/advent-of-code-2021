import { Point } from '../shared/graph';
import { readInput } from '../shared/io';

const getLowPoints = (map: number[][]) => {
  const lowPoints: Point[] = [];
  const numOfColumns = map[0].length;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < numOfColumns; y++) {
      const value = map[x][y];

      if (
        (y === numOfColumns - 1 || value < map[x][y + 1]) &&
        (y === 0 || value < map[x][y - 1]) &&
        (x === 0 || value < map[x - 1][y]) &&
        (x === map.length - 1 || value < map[x + 1][y])
      ) {
        lowPoints.push({ x, y });
      }
    }
  }

  return lowPoints;
};

type ReduceBuilderFn = (map: number[][]) => (acc: number, point: Point) => number;

const part1: ReduceBuilderFn = (map: number[][]) => (acc, point) => {
  const value = map[point.x][point.y];
  return acc + +value + 1;
};

const day09 = (reduceBuilderFn: ReduceBuilderFn) => {
  const data = readInput('input/day09.txt').map((line) => line.split('').map((num) => parseInt(num)));

  const lowPoints = getLowPoints(data);

  return lowPoints.reduce(reduceBuilderFn(data), 0);
};

console.log('Day 9 - Part 1', day09(part1));
