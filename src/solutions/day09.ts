import { Point } from '../shared/graph';
import { readInputToMatrix } from '../shared/io';

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

type ScanFn = (map: number[][], lowPoints: Point[]) => number;

const part1: ScanFn = (map: number[][], lowPoints: Point[]) => {
  return lowPoints.reduce((acc, point) => {
    const value = map[point.x][point.y];
    return acc + +value + 1;
  }, 0);
};

const searchBasin = (map: number[][], { x, y }: Point, visited: Set<String>): number => {
  const pointKey = `${x}-${y}`;
  if (x < 0 || x > map.length - 1 || y < 0 || y > map[0].length - 1 || visited.has(pointKey) || map[x][y] === 9) {
    return 0;
  }

  visited.add(pointKey);

  return (
    1 +
    searchBasin(map, { x: x + 1, y }, visited) +
    searchBasin(map, { x: x - 1, y }, visited) +
    searchBasin(map, { x, y: y + 1 }, visited) +
    searchBasin(map, { x, y: y - 1 }, visited)
  );
};

const part2: ScanFn = (map: number[][], lowPoints: Point[]) => {
  const basinSizes: number[] = [];

  for (const lowPoint of lowPoints) {
    basinSizes.push(searchBasin(map, lowPoint, new Set()));
  }

  const threeLargestBasinSizes = basinSizes.sort((a, b) => b - a).slice(0, 3);

  return threeLargestBasinSizes.reduce((acc, size) => acc * size);
};

const day09 = (scanFn: ScanFn) => {
  const data = readInputToMatrix('day09');

  const lowPoints = getLowPoints(data);

  return scanFn(data, lowPoints);
};

console.log('Day 9 - Part 1', day09(part1));
console.log('Day 9 - Part 2', day09(part2));
