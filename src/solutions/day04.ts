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

const updateCards = (bingoCards: BingoCard[], number: string) => {
  let winningIndexes: number[] = [];
  for (let i = 0; i < bingoCards.length; i++) {
    if (markCardAndCheckForWin(bingoCards[i], number)) {
      winningIndexes.push(i);
    }
  }

  return winningIndexes;
};

const part1 = () => {
  const { bingoCards, drawnNumbers } = parseInput();

  for (const currentNumber of drawnNumbers) {
    const winningIndexes = updateCards(bingoCards, currentNumber);
    if (winningIndexes.length > 0) {
      const winningIndex = winningIndexes.shift();
      return parseInt(currentNumber) * sumUnmarkedNumbers(bingoCards[winningIndex!]);
    }
  }
};

const part2 = () => {
  const { bingoCards, drawnNumbers } = parseInput();
  const winners = [];

  for (const currentNumber of drawnNumbers) {
    const winningIndexes = updateCards(bingoCards, currentNumber);
    if (winningIndexes) {
      const indexesToRemove = [];
      for (const winningIndex of winningIndexes) {
        winners.push({ winningCard: bingoCards[winningIndex], winningNumber: currentNumber });
        indexesToRemove.push(winningIndex);
      }

      for (let i = indexesToRemove.length - 1; i >= 0; i--) {
        bingoCards.splice(indexesToRemove[i], 1);
      }
    }
  }

  const lastWinner = winners.pop();
  if (!lastWinner) throw Error('Something went wrong - there were no winners');

  return parseInt(lastWinner.winningNumber) * sumUnmarkedNumbers(lastWinner.winningCard);
};

console.log('Day 4 - Part 1', part1());
console.log('Day 4 - Part 2', part2());
