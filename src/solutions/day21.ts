class DeterministicDie {
  private currentVal = 100;
  private numRolls = 0;

  roll() {
    this.numRolls++;
    if (this.currentVal === 100) {
      this.currentVal = 1;
    } else {
      this.currentVal += 1;
    }

    return this.currentVal;
  }

  getNumRolls() {
    return this.numRolls;
  }
}

const PLAYER_ONE_START = 10;
const PLAYER_TWO_START = 9;

const day21 = () => {
  let player1Position = PLAYER_ONE_START;
  let player2Position = PLAYER_TWO_START;
  let player1Score = 0;
  let player2Score = 0;

  const die = new DeterministicDie();

  while (player1Score < 1000 && player2Score < 1000) {
    let moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player1Position = (moveTotal + player1Position) % 10 || 10;
    player1Score += player1Position;

    if (player1Score >= 1000) break;

    moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player2Position = (moveTotal + player2Position) % 10 || 10;
    player2Score += player2Position;
  }

  return die.getNumRolls() * Math.min(player1Score, player2Score);
};

console.log('Day 21 - Part 1', day21());
