import { readInput } from '../shared/io';

const calculateTotalFuel = (position: number, locations: number[], fuelFn: FuelFn) => {
  let totalFuel = 0;
  for (const location of locations) {
    totalFuel += fuelFn(position, location);
  }

  return totalFuel;
};

type FuelFn = (position1: number, position2: number) => number;

const part1Fuel = (position1: number, position2: number) => {
  return Math.abs(position1 - position2);
};

const part2Fuel = (position1: number, position2: number) => {
  const absoluteDistance = Math.abs(position1 - position2);
  return (absoluteDistance ** 2 + absoluteDistance) / 2;
};

const day07 = (fuelFn: FuelFn) => {
  const data = readInput('input/day07.txt');
  const locations = data[0].split(',').map((num) => parseInt(num));
  const max = Math.max(...locations);

  let minimumFuel = Number.MAX_VALUE;
  for (let i = 0; i < max; i++) {
    const fuelUsed = calculateTotalFuel(i, locations, fuelFn);
    if (fuelUsed > minimumFuel) {
      return minimumFuel;
    }

    minimumFuel = fuelUsed;
  }

  return minimumFuel;
};

console.log('Day 7 - Part 1', day07(part1Fuel));
console.log('Day 7 - Part 2', day07(part2Fuel));
