import { readInput } from '../shared/io';

type Rules = {
  [k: string]: string;
};

type CharCount = {
  [k: string]: number;
};

const mergeCounts = (baseCount: CharCount, newCount: CharCount) => {
  for (const key of Object.keys(newCount)) {
    if (baseCount[key]) {
      baseCount[key] += newCount[key];
    } else {
      baseCount[key] = newCount[key];
    }
  }
};

const memo: { [key: string]: CharCount } = {};
const rCount = (polymer: string, rules: Rules, steps: number) => {
  if (steps === 0 || !rules[polymer]) {
    return { [polymer[0]]: 1 };
  }

  const key = `${polymer}-${steps.toString()}`;
  if (memo[key]) {
    return memo[key];
  }

  let charCount: CharCount = {};
  const leftPair = polymer[0] + rules[polymer];
  const rightPair = rules[polymer] + polymer[1];

  mergeCounts(charCount, rCount(leftPair, rules, steps - 1));
  mergeCounts(charCount, rCount(rightPair, rules, steps - 1));

  memo[key] = charCount;

  return charCount;
};

const day14 = (steps: number) => {
  const data = readInput('input/day14.txt');

  let polymer = data[0];

  const rules: Rules = {};
  for (let i = 2; i < data.length; i++) {
    const [adjPair, element] = data[i].split(' -> ');
    rules[adjPair] = element;
  }

  let charCount: CharCount = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];
    mergeCounts(charCount, rCount(pair, rules, steps));
  }

  // Add in last char
  mergeCounts(charCount, { [polymer[polymer.length - 1]]: 1 });

  const counts = Object.values(charCount);
  return Math.max(...counts) - Math.min(...counts);
};

console.log('Day 14 - Part 1', day14(10));
console.log('Day 14 - Part 2', day14(40));
