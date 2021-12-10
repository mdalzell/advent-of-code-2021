import { readInput } from '../shared/io';

const illegalCharacterValues: { [key: string]: number } = Object.freeze({
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
});

const openingCharacterMap: { [key: string]: string } = Object.freeze({
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
});

const bracketChecker = (line: string) => {
  const bracketStack = [];

  for (const char of line) {
    if (['(', '[', '{', '<'].includes(char)) {
      bracketStack.push(char);
    } else if ([')', ']', '}', '>'].includes(char)) {
      const lastBracket = bracketStack.pop();
      if (lastBracket !== openingCharacterMap[char]) {
        return illegalCharacterValues[char];
      }
    }
  }

  return 0;
};

const day10 = () => {
  const data = readInput('input/day10.txt');

  return data.reduce((acc, line) => {
    return acc + bracketChecker(line);
  }, 0);
};

console.log('Day 10 - Part 1', day10());
