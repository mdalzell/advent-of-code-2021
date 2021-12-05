import { readInput } from '../shared/io';

type PointIntersectionCountMap = {
  [point: string]: number;
};

type Point = {
  x: number;
  y: number;
};

const addToPointIntersectionCount = (pointIntersectionCount: PointIntersectionCountMap, key: string) => {
  if (pointIntersectionCount[key]) {
    pointIntersectionCount[key]++;
  } else {
    pointIntersectionCount[key] = 1;
  }
};

const countIntersections = (pointIntersectionCount: PointIntersectionCountMap) => {
  let intersectionCount = 0;
  for (const key in pointIntersectionCount) {
    if (pointIntersectionCount[key] > 1) {
      intersectionCount++;
    }
  }

  return intersectionCount;
};

const buildPoint = (coordinates: string) => {
  const [xValue, yValue] = coordinates.split(',');
  return { x: parseInt(xValue), y: parseInt(yValue) };
};

const day05 = (diagonalFn: (pointIntersectionCount: PointIntersectionCountMap, start: Point, end: Point) => void = () => {}) => {
  const data = readInput('input/day05.txt');
  const pointIntersectionCount: PointIntersectionCountMap = {};

  for (const line of data) {
    const [startCoordinates, endCoordinates] = line.split(' -> ');
    const start = buildPoint(startCoordinates);
    const end = buildPoint(endCoordinates);

    if (start.x === end.x) {
      for (let i = Math.min(start.y, end.y); i <= Math.max(start.y, end.y); i++) {
        addToPointIntersectionCount(pointIntersectionCount, `(${start.x},${i})`);
      }
    } else if (start.y === end.y) {
      for (let i = Math.min(start.x, end.x); i <= Math.max(start.x, end.x); i++) {
        addToPointIntersectionCount(pointIntersectionCount, `(${i},${start.y})`);
      }
    } else {
      diagonalFn(pointIntersectionCount, start, end);
    }
  }

  return countIntersections(pointIntersectionCount);
};

const calculateDiagonalLine = (pointIntersectionCount: PointIntersectionCountMap, start: Point, end: Point) => {
  const slope = Math.min(start.x, end.x) === start.x ? (end.y - start.y) / (end.x - start.x) : (start.y - end.y) / (start.x - end.x);
  const b = start.y - slope * start.x;
  for (let i = Math.min(start.x, end.x); i <= Math.max(start.x, end.x); i++) {
    addToPointIntersectionCount(pointIntersectionCount, `(${i},${slope * i + b})`);
  }
};

console.log('Day 5 - Part 1', day05());
console.log('Day 5 - Part 2', day05(calculateDiagonalLine));
