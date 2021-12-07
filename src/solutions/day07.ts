import { readInput } from '../shared/io';

const calculateTotalFuel = (position: number, locations: number[]) => {
  let totalFuel = 0;
  for (const location of locations) {
    totalFuel += Math.abs(location - position);
  }

  return totalFuel;
};

const day07 = () => {
  const data = readInput('input/day07.txt');
  const locations = data[0].split(',').map((num) => parseInt(num));
  const max = Math.max(...locations);

  let minimumFuel = Number.MAX_VALUE;
  for (let i = 0; i < max; i++) {
    const fuelUsed = calculateTotalFuel(i, locations);
    if (fuelUsed > minimumFuel) {
      return minimumFuel;
    }

    minimumFuel = fuelUsed;
  }

  return minimumFuel;
};

console.log('Day 7 - Part 1', day07());
