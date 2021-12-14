import { Point } from '../shared/graph';
import { readInput, stringToNumber } from '../shared/io';

type Fold = {
  direction: 'x' | 'y';
  value: number;
};

type ParsedInput = {
  folds: Fold[];
  points: Set<string>;
};

const parseInput = (): ParsedInput => {
  const data = readInput('input/day13.txt');

  const points = new Set<string>();
  const folds: Fold[] = [];

  for (const line of data) {
    if (line.includes(',')) {
      points.add(line);
    } else if (line.includes('x=')) {
      const [_, x] = line.split('x=');
      folds.push({ direction: 'x', value: parseInt(x) });
    } else if (line.includes('y=')) {
      const [_, y] = line.split('y=');
      folds.push({ direction: 'y', value: parseInt(y) });
    }
  }

  return { points, folds };
};

const fold = (fold: Fold, points: Set<string>): Set<string> => {
  const updatedPoints = new Set<string>();

  for (const point of points) {
    const [x, y] = point.split(',').map(stringToNumber);
    if (fold.direction === 'x') {
      if (x > fold.value) {
        const newX = 2 * fold.value - x;
        updatedPoints.add(`${newX},${y}`);
      } else {
        updatedPoints.add(point);
      }
    } else {
      if (y > fold.value) {
        const newY = 2 * fold.value - y;
        updatedPoints.add(`${x},${newY}`);
      } else {
        updatedPoints.add(point);
      }
    }
  }

  return updatedPoints;
};

const part1 = () => {
  const { points, folds } = parseInput();

  const updatedPoints = fold(folds[0], points);

  return Array.from(updatedPoints.values()).length;
};

const getMaxes = (points: Set<string>) => {
  let maxX = 0;
  let maxY = 0;

  for (const point of points) {
    const [x, y] = point.split(',').map(stringToNumber);
    if (x > maxX) maxX = x;
    else if (y > maxY) maxY = y;
  }

  return { maxX, maxY };
};

const part2 = () => {
  const { points, folds } = parseInput();

  let currentPoints = points;
  for (const currentFold of folds) {
    currentPoints = fold(currentFold, currentPoints);
  }

  const { maxX, maxY } = getMaxes(currentPoints);

  const message = [];
  for (let y = 0; y <= maxY; y++) {
    let row = '';
    for (let x = 0; x <= maxX; x++) {
      if (currentPoints.has(`${x},${y}`)) row += '#';
      else row += '.';
    }

    message.push(row);
  }

  for (const line of message) {
    console.log(line);
  }
};

console.log('Day 13 - Part 1', part1());

console.log('Day 13 - Part 2');
part2();
