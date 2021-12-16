import { readInput } from '../shared/io';

type Rules = {
  [k: string]: string;
};

type CharCount = {
  [k: string]: number;
};

const insert = (polymer: string, rules: Rules) => {
  let newPolymer = '';
  for (let i = 0; i < polymer.length - 1; i++) {
    newPolymer += polymer[i];
    const currentPair = polymer.substring(i, i + 2);
    if (rules[currentPair]) {
      newPolymer += rules[currentPair];
    }
  }

  newPolymer += polymer[polymer.length - 1];

  return newPolymer;
};

const countChars = (polymer: string) => {
  const charCount: CharCount = {};

  for (const char of polymer) {
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }

  return charCount;
};

const day14 = () => {
  const data = readInput('input/day14.txt');

  let polymer = data[0];

  const rules: Rules = {};
  for (let i = 2; i < data.length; i++) {
    const [adjPair, element] = data[i].split(' -> ');
    rules[adjPair] = element;
  }

  for (let i = 0; i < 10; i++) {
    polymer = insert(polymer, rules);
  }

  const charCount = countChars(polymer);
  const counts = Object.values(charCount);

  return Math.max(...counts) - Math.min(...counts);
};

console.log('Day 14 - Part 1', day14());
