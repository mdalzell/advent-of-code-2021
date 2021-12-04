import { readFileSync } from 'fs';

type BingoNumber = {
  marked: boolean;
  value: string;
};

type BingoCard = {
  numbers: BingoNumber[][];
  win: boolean;
};

const parseInput = () => {
  const data = readFileSync('input/day04.txt', 'utf-8').split(/\r?\n/);
  const drawnNumbers = data[0].split(',');
  const bingoCards: BingoCard[] = [];

  for (let i = 2; i < data.length; i += 6) {
    let numbers: BingoNumber[][] = [];
    for (let j = 0; j < 5; j++) {
      const bingoRow = data[i + j]
        .split(' ')
        .filter((item) => item !== '')
        .map((item) => ({ marked: false, value: item }));
      numbers.push(bingoRow);
    }

    bingoCards.push({
      numbers,
      win: false,
    });
  }

  return { bingoCards, drawnNumbers };
};

const markCardAndCheckForWin = (card: BingoCard, number: string) => {
  const markedInColumn = [0, 0, 0, 0, 0];

  for (const row of card.numbers) {
    let allMarked = true;
    for (let i = 0; i < 5; i++) {
      if (row[i].value === number) {
        row[i].marked = true;
      }

      if (row[i].marked) {
        markedInColumn[i]++;
      } else {
        allMarked = false;
      }
    }

    if (allMarked) return true;
  }

  return markedInColumn.some((item) => item === 5);
};

const sumUnmarkedNumbers = (card: BingoCard) => {
  let unmarkedSum = 0;
  for (const row of card.numbers) {
    for (const number of row) {
      if (!number.marked) unmarkedSum += parseInt(number.value);
    }
  }

  return unmarkedSum;
};

const day04 = () => {
  const { bingoCards, drawnNumbers } = parseInput();

  for (const currentNumber of drawnNumbers) {
    for (const currentCard of bingoCards) {
      if (markCardAndCheckForWin(currentCard, currentNumber)) {
        return parseInt(currentNumber) * sumUnmarkedNumbers(currentCard);
      }
    }
  }
};

console.log('Day 4 - Part 1', day04());
