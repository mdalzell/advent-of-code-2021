import { readInput } from '../shared/io';

const day09 = () => {
  const data = readInput('input/day09.txt');

  let riskLevel = 0;
  for (let i = 0; i < data.length; i++) {
    const numOfColumns = data[0].length;
    for (let j = 0; j < numOfColumns; j++) {
      const value = parseInt(data[i][j]);

      if (
        (j === numOfColumns - 1 || value < parseInt(data[i][j + 1])) &&
        (j === 0 || value < parseInt(data[i][j - 1])) &&
        (i === 0 || value < parseInt(data[i - 1][j])) &&
        (i === data.length - 1 || value < parseInt(data[i + 1][j]))
      ) {
        riskLevel += value + 1;
      }
    }
  }

  return riskLevel;
};

console.log('Day 9 - Part 1', day09());
