import { readFileSync } from 'fs';

export const readInput = (filePath: string) => {
  const data = readFileSync(filePath, 'utf-8');
  return data.split(/\r?\n/);
};

export type Matrix = number[][];

export const stringToNumber = (num: string) => parseInt(num);

export const readInputToMatrix = (textFileName: string): Matrix => {
  return readInput(`input/${textFileName}.txt`).map((line) => line.split('').map(stringToNumber));
};
