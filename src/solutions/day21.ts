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

  constructor(position: number, score: number = 0) {
    this.position = position;
    this.score = score;
  }

  getPosition() {
    return this.position;
  }

  getScore() {
    return this.score;
  }

  move(moveTotal: number) {
    this.position = (moveTotal + this.position) % 10 || 10;
    this.score += this.position;
  }

  copy(): Player {
    return new Player(this.position, this.score);
  }

  toString(): string {
    return `${this.position}-${this.score}`;
  }
}

const PLAYER_ONE_START = 10;
const PLAYER_TWO_START = 9;

const day21 = () => {
  const player1 = new Player(PLAYER_ONE_START);
  const player2 = new Player(PLAYER_TWO_START);

  const die = new DeterministicDie();

  while (player1.getScore() < 1000 && player2.getScore() < 1000) {
    let moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player1.move(moveTotal);

    if (player1.getScore() >= 1000) break;

    moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player2.move(moveTotal);
  }

  return die.getNumRolls() * Math.min(player1.getScore(), player2.getScore());
};

const winArray = [0, 0];
const memo: { [k: string]: number[] } = {};
const rTurn = (player1: Player, player2: Player, isPlayer1Turn: boolean) => {
  const key = `${player1}-${player2}-${isPlayer1Turn}`;

  if (memo[key]) return memo[key];

  if (player1.getScore() > 20) {
    return [1, 0];
  } else if (player2.getScore() > 20) {
    return [0, 1];
  }

  const wins = [0, 0];
  if (isPlayer1Turn) {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          let moveTotal = i + j + k;
          let newPlayer = player1.copy();
          newPlayer.move(moveTotal);
          const result = rTurn(newPlayer, player2, false);

          wins[0] += result[0];
          wins[1] += result[1];
        }
      }
    }
  } else {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          let moveTotal = i + j + k;
          let newPlayer = player2.copy();
          newPlayer.move(moveTotal);
          const result = rTurn(player1, newPlayer, true);

          wins[0] += result[0];
          wins[1] += result[1];
        }
      }
    }
  }

  memo[key] = wins;
  return wins;
};

const part2 = () => {
  const player1 = new Player(PLAYER_ONE_START);
  const player2 = new Player(PLAYER_TWO_START);

  const wins = rTurn(player1, player2, true);

  return Math.max(...wins);
};

console.log('Day 21 - Part 1', day21());
console.log('Day 21 - Part 2', part2());
