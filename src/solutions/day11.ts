import { Point } from '../shared/graph';
import { readInput } from '../shared/io';

const GRID_DIMENSION = 10;

const checkForFlash = (octopusMap: number[][], { x, y }: Point, flashed: Set<String>): number => {
  const key = `${x}-${y}`;
  if (flashed.has(key) || x < 0 || x > GRID_DIMENSION - 1 || y < 0 || y > GRID_DIMENSION - 1) return 0;

  octopusMap[x][y]++;
  if (octopusMap[x][y] < 10) {
    return 0;
  }

  flashed.add(key);
  octopusMap[x][y] = 0;

  const adjacentPoints: Point[] = [
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x + 1, y },
    { x: x + 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y },
    { x: x - 1, y: y + 1 },
  ];

  return adjacentPoints.reduce((acc, point) => {
    return acc + checkForFlash(octopusMap, point, flashed);
  }, 1);
};

const day11 = () => {
  const octopusMap = readInput('input/day11.txt').map((line) => line.split('').map((num) => parseInt(num)));
  const stepCount = 100;

  let flashCount = 0;
  let currentStep = 0;
  while (currentStep < stepCount) {
    const flashed = new Set<String>();
    for (let x = 0; x < GRID_DIMENSION; x++) {
      for (let y = 0; y < GRID_DIMENSION; y++) {
        flashCount += checkForFlash(octopusMap, { x, y }, flashed);
      }
    }

    currentStep++;
  }

  return flashCount;
};

console.log('Day 11 - Part 1', day11());
