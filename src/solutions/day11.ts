import { Point } from '../shared/graph';
import { Matrix, readInputToMatrix } from '../shared/io';

const GRID_DIMENSION = 10;

const checkForFlash = (octopusMap: Matrix, { x, y }: Point, flashed: Set<String>): number => {
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

const flashesForStep = (octopusMap: Matrix) => {
  let flashCount = 0;
  const flashed = new Set<String>();
  for (let x = 0; x < GRID_DIMENSION; x++) {
    for (let y = 0; y < GRID_DIMENSION; y++) {
      flashCount += checkForFlash(octopusMap, { x, y }, flashed);
    }
  }

  return flashCount;
};

type FlashCalcFn = (octopusMap: Matrix) => number;

const part2 = (octopusMap: Matrix) => {
  let flashCount = 0;
  let currentStep = 0;
  while (flashCount != 100) {
    flashCount = flashesForStep(octopusMap);
    currentStep++;
  }

  return currentStep;
};

const part1 = (octopusMap: Matrix) => {
  const stepCount = 100;

  let flashCount = 0;
  let currentStep = 0;
  while (currentStep < stepCount) {
    flashCount += flashesForStep(octopusMap);
    currentStep++;
  }

  return flashCount;
};

const day11 = (flashCalcFn: FlashCalcFn) => {
  const octopusMap = readInputToMatrix('day11');
  return flashCalcFn(octopusMap);
};

console.log('Day 11 - Part 1', day11(part1));
console.log('Day 11 - Part 2', day11(part2));
