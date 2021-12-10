import { readInput } from '../shared/io';

const illegalCharacterValues: { [key: string]: number } = Object.freeze({
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
});

const autocompleteCharacterValues: { [key: string]: number } = Object.freeze({
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
});

const closingCharacterMap: { [key: string]: string } = Object.freeze({
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
});

type AutoCompleteFn = (bracketStack: string[]) => number;
type ErrorFn = (char: string) => number;
type ScoreFn = (scores: number[]) => number;

const autoCompleteScore = (bracketStack: string[]) => {
  let closingSequence = '';
  while (bracketStack.length !== 0) {
    closingSequence += closingCharacterMap[bracketStack.pop()!];
  }

  return closingSequence.split('').reduce((acc, char) => {
    return acc * 5 + autocompleteCharacterValues[char];
  }, 0);
};

const errorScore = (scores: number[]) => {
  return scores.reduce((acc, score) => acc + score, 0);
};

const zeroScore = () => 0;

const getMiddleScore = (scores: number[]) => {
  const sortedScores = scores.filter((score) => score !== 0).sort((a, b) => a - b);

  return sortedScores[Math.round((sortedScores.length - 1) / 2)];
};

const bracketChecker = (autocompleteFn: AutoCompleteFn, errorFn: ErrorFn, scoreFn: ScoreFn) => {
  const data = readInput('input/day10.txt');

  const scores = data.map((line) => {
    const bracketStack = [];

    for (const char of line) {
      if (['(', '[', '{', '<'].includes(char)) {
        bracketStack.push(char);
      } else if ([')', ']', '}', '>'].includes(char)) {
        const lastBracket = bracketStack.pop();
        if (closingCharacterMap[lastBracket!] !== char) {
          return errorFn(char);
        }
      }
    }

    return autocompleteFn(bracketStack);
  });

  return scoreFn(scores);
};

console.log(
  'Day 10 - Part 1',
  bracketChecker(zeroScore, (char) => illegalCharacterValues[char], errorScore),
);
console.log('Day 10 - Part 2', bracketChecker(autoCompleteScore, zeroScore, getMiddleScore));
