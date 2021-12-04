import { readFileSync } from 'fs';

export const readInput = (filePath: string) => {
  const data = readFileSync(filePath, 'utf-8');
  return data.split(/\r?\n/);
};
