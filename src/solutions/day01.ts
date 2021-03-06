import { readInput } from '../shared/io';

const dayOnePartOne = () => {
  const depths = readInput('input/day01.txt');

  const result = depths.reduce((acc, current, index, arr) => {
    return +current > +arr[index - 1] ? acc + 1 : acc;
  }, 0);

  console.log('Day One - Part One:', result);
};

const dayOnePartTwo = () => {
  const depths = readInput('input/day01.txt');

  let increaseCount = 0;
  const depthWindow: number[] = [];
  depths.forEach((depth) => {
    depthWindow.push(+depth);

    if (depthWindow.length === 4) {
      const removed = depthWindow.shift();
      if (+depth > +removed!) increaseCount++;
    }
  });

  console.log('Day One - Part Two:', increaseCount);
};

dayOnePartOne();
dayOnePartTwo();
