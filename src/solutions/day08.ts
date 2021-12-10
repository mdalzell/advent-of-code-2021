import { readInput } from '../shared/io';

const countUniqueNumbersInOutput = (line: string) => {
  let uniqueNumberCount = 0;
  const [_signalPatterns, output] = line.split(' | ');
  const digits = output.split(' ');

  for (const digit of digits) {
    if ([2, 4, 3, 7].includes(digit.length)) {
      uniqueNumberCount++;
    }
  }

  return uniqueNumberCount;
};

const day08 = () => {
  const data = readInput('input/day08.txt');

  return data.reduce((acc, line) => {
    return acc + countUniqueNumbersInOutput(line);
  }, 0);
};

console.log('Day 8 - Part 1', day08());
