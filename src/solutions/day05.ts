import { readInput } from '../shared/io';

type PointIntersectionCountMap = {
  [point: string]: number;
};

const buildPointIntersectionCount = (input: string[]) => {
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
    }
  }

  return pointIntersectionCount;
};

const day05 = () => {
  const data = readInput('input/day05.txt');
  const pointIntersectionCount = buildPointIntersectionCount(data);

  let intersectionCount = 0;
  for (const key in pointIntersectionCount) {
    if (pointIntersectionCount[key] > 1) {
      intersectionCount++;
    }
  }

  return intersectionCount;
};

console.log('Day 5 - Part 1', day05());
