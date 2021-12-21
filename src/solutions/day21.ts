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

class Player {
  private position: number;
  private score: number;

  constructor(position: number) {
    this.position = position;
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  move(die: DeterministicDie) {
    let moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    this.position = (moveTotal + this.position) % 10 || 10;
    this.score += this.position;
  }
}

const PLAYER_ONE_START = 10;
const PLAYER_TWO_START = 9;

const day21 = () => {
  const player1 = new Player(PLAYER_ONE_START);
  const player2 = new Player(PLAYER_TWO_START);

  const die = new DeterministicDie();

  while (player1.getScore() < 1000 && player2.getScore() < 1000) {
    player1.move(die);

    if (player1.getScore() >= 1000) break;

    player2.move(die);
  }

  return die.getNumRolls() * Math.min(player1.getScore(), player2.getScore());
};

console.log('Day 21 - Part 1', day21());
