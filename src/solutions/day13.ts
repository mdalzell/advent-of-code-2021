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

const day13 = () => {
  const { points, folds } = parseInput();

  const updatedPoints = fold(folds[0], points);

  return Array.from(updatedPoints.values()).length;
};

console.log('Day 13 - Part 1', day13());
