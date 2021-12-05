import { readInput } from '../shared/io';

type PointIntersectionCountMap = {
  [point: string]: number;
};

const buildPointIntersectionCount = (input: string[], includeDiagonal: boolean) => {
  const pointIntersectionCount: PointIntersectionCountMap = {};

  for (const line of input) {
    const [startPoint, endPoint] = line.split(' -> ');
    const [startPointX, startPointY] = startPoint.split(',').map((num) => parseInt(num));
    const [endPointX, endPointY] = endPoint.split(',').map((num) => parseInt(num));

    if (startPointX === endPointX) {
      for (let i = Math.min(startPointY, endPointY); i <= Math.max(startPointY, endPointY); i++) {
        const key = `(${startPointX},${i})`;
        if (pointIntersectionCount[key]) {
          pointIntersectionCount[key]++;
        } else {
          pointIntersectionCount[key] = 1;
        }
      }
    } else if (startPointY === endPointY) {
      for (let i = Math.min(startPointX, endPointX); i <= Math.max(startPointX, endPointX); i++) {
        const key = `(${i},${startPointY})`;
        if (pointIntersectionCount[key]) {
          pointIntersectionCount[key]++;
        } else {
          pointIntersectionCount[key] = 1;
        }
      }
    } else if (includeDiagonal) {
      const slope =
        Math.min(startPointX, endPointX) === startPointX
          ? (endPointY - startPointY) / (endPointX - startPointX)
          : (startPointY - endPointY) / (startPointX - endPointX);
      const b = startPointY - slope * startPointX;
      for (let i = Math.min(startPointX, endPointX); i <= Math.max(startPointX, endPointX); i++) {
        const key = `(${i},${slope * i + b})`;
        if (pointIntersectionCount[key]) {
          pointIntersectionCount[key]++;
        } else {
          pointIntersectionCount[key] = 1;
        }
      }
    }
  }

  return pointIntersectionCount;
};

const day05 = (includeDiagonal: boolean) => {
  const data = readInput('input/day05.txt');
  const pointIntersectionCount = buildPointIntersectionCount(data, includeDiagonal);

  let intersectionCount = 0;
  for (const key in pointIntersectionCount) {
    if (pointIntersectionCount[key] > 1) {
      intersectionCount++;
    }
  }

  return intersectionCount;
};

console.log('Day 5 - Part 1', day05(false));
console.log('Day 5 - Part 2', day05(true));
