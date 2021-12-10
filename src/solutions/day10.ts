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

const autoCompleteScore = (bracketStack: string[]) => {
  let closingSequence = '';
  while (bracketStack.length !== 0) {
    closingSequence += closingCharacterMap[bracketStack.pop()!];
  }

  return closingSequence.split('').reduce((acc, char) => {
    return acc * 5 + autocompleteCharacterValues[char];
  }, 0);
};

type AutoCompleteFn = (bracketStack: string[]) => number;
type ErrorFn = (char: string) => number;

const bracketChecker = (line: string, autocompleteFn: AutoCompleteFn, errorFn: (char: string) => number) => {
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
};

type SyntaxScoreFn = (lines: string[]) => number;

const part1: SyntaxScoreFn = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    return (
      acc +
      bracketChecker(
        line,
        () => 0,
        (char) => illegalCharacterValues[char],
      )
    );
  }, 0);
};

const part2: SyntaxScoreFn = (lines: string[]) => {
  const autoCompleteScores = lines
    .map((line) => bracketChecker(line, autoCompleteScore, () => 0))
    .filter((score) => score !== 0)
    .sort((a, b) => a - b);

  return autoCompleteScores[Math.round((autoCompleteScores.length - 1) / 2)];
};

const day10 = (syntaxScoreFn: SyntaxScoreFn) => {
  const data = readInput('input/day10.txt');

  return syntaxScoreFn(data);
};

console.log('Day 10 - Part 1', day10(part1));
console.log('Day 10 - Part 2', day10(part2));
