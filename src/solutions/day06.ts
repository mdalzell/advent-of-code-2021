import { readInput, stringToNumber } from '../shared/io';

type Memo = {
  [k: string]: number;
};

const memo: Memo = {};

const countLanternFish = (lanternfish: number, countdown: number): number => {
  if (countdown === 0) {
    return 1;
  }

  if (lanternfish === 0) {
    return countLanternFish(6, countdown - 1) + countLanternFish(8, countdown - 1);
  } else {
    const key = `${lanternfish - 1}-${countdown - 1}`;
    if (memo[key]) {
      return memo[key];
    } else {
      const value = countLanternFish(lanternfish - 1, countdown - 1);
      memo[key] = value;
      return value;
    }
  }
};

const day06 = (days: number) => {
  const data = readInput('input/day06.txt')[0];
  let lanternfish = data.split(',').map(stringToNumber);

  let total = 0;
  for (const fish of lanternfish) {
    total += countLanternFish(fish, days);
  }

  return total;
};

console.log('Day 6 - Part 1', day06(80));
console.log('Day 6 - Part 2', day06(256));
