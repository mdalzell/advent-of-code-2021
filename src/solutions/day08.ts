import { readInput } from '../shared/io';

const getUniqueNumbers = (patterns: string[]) => {
  let uniqueNumbers = [];

  for (const digit of patterns) {
    if ([2, 4, 3, 7].includes(digit.length)) {
      uniqueNumbers.push(digit);
    }
  }

  return uniqueNumbers;
};

const checkZero = (digit: string, digitMap: string[]) => {
  if (digit.length !== 6) return false;

  const sevenSegments = digitMap[7].split('');
  for (const segment of sevenSegments) {
    if (!digit.includes(segment)) {
      return false;
    }
  }

  const fourSegments = digitMap[4].split('');
  let mismatchCount = 0;
  for (const segment of fourSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  return mismatchCount === 1;
};

const checkTwo = (digit: string, digitMap: string[]) => {
  if (digit.length !== 5) return false;

  const fourSegments = digitMap[4].split('');
  let mismatchCount = 0;
  for (const segment of fourSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  return mismatchCount === 2;
};

const checkThree = (digit: string, digitMap: string[]) => {
  if (digit.length !== 5) return false;

  const oneSegments = digitMap[1].split('');
  for (const segment of oneSegments) {
    if (!digit.includes(segment)) {
      return false;
    }
  }

  return true;
};

const checkFive = (digit: string, digitMap: string[]) => {
  if (digit.length !== 5) return false;

  const fourSegments = digitMap[4].split('');
  let mismatchCount = 0;
  for (const segment of fourSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  const oneSegments = digitMap[1].split('');
  for (const segment of oneSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  return mismatchCount === 2;
};

const checkSix = (digit: string, digitMap: string[]) => {
  if (digit.length !== 6) return false;

  let mismatchCount = 0;
  const fourSegments = digitMap[4].split('');
  for (const segment of fourSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  const oneSegments = digitMap[1].split('');
  for (const segment of oneSegments) {
    if (!digit.includes(segment)) mismatchCount++;
  }

  return mismatchCount === 2;
};

const checkNine = (digit: string, digitMap: string[]) => {
  if (digit.length !== 6) return false;

  const fourSegments = digitMap[4].split('');
  for (const segment of fourSegments) {
    if (!digit.includes(segment)) return false;
  }

  return true;
};

const analyzeSignalPatterns = (patterns: string[]) => {
  const digitMap: string[] = Array(10);
  const uniqueNumbers = getUniqueNumbers(patterns);

  for (const digit of uniqueNumbers) {
    if (digit.length === 2) digitMap[1] = digit;
    else if (digit.length === 4) digitMap[4] = digit;
    else if (digit.length === 3) digitMap[7] = digit;
    else if (digit.length === 7) digitMap[8] = digit;
  }

  for (const digit of patterns) {
    if (![2, 4, 3, 7].includes(digit.length)) {
      if (checkZero(digit, digitMap)) {
        digitMap[0] = digit;
      } else if (checkTwo(digit, digitMap)) {
        digitMap[2] = digit;
      } else if (checkThree(digit, digitMap)) {
        digitMap[3] = digit;
      } else if (checkFive(digit, digitMap)) {
        digitMap[5] = digit;
      } else if (checkSix(digit, digitMap)) {
        digitMap[6] = digit;
      } else if (checkNine(digit, digitMap)) {
        digitMap[9] = digit;
      }
    }
  }

  return digitMap;
};

const part1 = (acc: number, line: string) => {
  const [_signalPatterns, output] = line.split(' | ');
  const digits = output.split(' ');

  return acc + getUniqueNumbers(digits).length;
};

const part2 = (acc: number, line: string) => {
  const [signalPatterns, output] = line.split(' | ');

  const digitMap = analyzeSignalPatterns(signalPatterns.split(' '));

  const outputValue = output.split(' ').reduce((acc, digit) => {
    const value = digitMap.findIndex(
      (mappedDigit) => new Set(mappedDigit).size === new Set(mappedDigit + digit).size && mappedDigit.length === digit.length,
    );
    return acc + value.toString();
  }, '');

  return acc + +outputValue;
};

const day08 = (reduceFn: (acc: number, line: string) => number) => {
  const data = readInput('input/day08.txt');

  return data.reduce(reduceFn, 0);
};

console.log('Day 8 - Part 1', day08(part1));
console.log('Day 8 - Part 2', day08(part2));
