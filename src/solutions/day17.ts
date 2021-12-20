import { Point } from '../shared/graph';

const X_MIN = 156;
const X_MAX = 202;
const Y_MIN = -110;
const Y_MAX = -69;

type PartFn = (velocities: Point[]) => number;

const part1 = (velocities: Point[]) => {
  return velocities.reduce((acc, current) => {
    const maxHeight = (current.y * (current.y + 1)) / 2;
    return maxHeight > acc ? maxHeight : acc;
  }, 0);
};

const part2 = (velocities: Point[]) => {
  return velocities.length;
};

// Yo dawg I heard you like brute force
const day17 = (partFn: PartFn) => {
  const velocities: Point[] = [];
  for (let dx = 0; dx < 10000; dx++) {
    for (let dy = -10_000; dy < 10000; dy++) {
      const position: Point = { x: 0, y: 0 };
      let xVel = dx;
      let yVel = dy;
      let positions = [];
      while (position.x <= X_MAX && position.y >= Y_MIN) {
        if (position.x >= X_MIN && position.y <= Y_MAX) {
          velocities.push({ x: dx, y: dy });
          break;
        }

        position.x += xVel;
        position.y += yVel;

        if (xVel > 0) {
          xVel -= 1;
        } else if (xVel < 0) {
          xVel += 1;
        }

        yVel -= 1;
      }
    }
  }

  return partFn(velocities);
};

console.log('Day 17 - Part 1', day17(part1));
console.log('Day 17 - Part 2', day17(part2));
