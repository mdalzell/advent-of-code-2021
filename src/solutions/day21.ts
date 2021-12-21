class DeterministicDie {
  private _currentVal = 100;
  private _numRolls = 0;

  roll() {
    this._numRolls++;
    if (this._currentVal === 100) {
      this._currentVal = 1;
    } else {
      this._currentVal += 1;
    }

    return this._currentVal;
  }

  get numRolls() {
    return this._numRolls;
  }
}

class Player {
  private _position: number;
  private _score: number;

  constructor(position: number, score: number = 0) {
    this._position = position;
    this._score = score;
  }

  get score() {
    return this._score;
  }

  move(moveTotal: number) {
    this._position = (moveTotal + this._position) % 10 || 10;
    this._score += this._position;
  }

  copy(): Player {
    return new Player(this._position, this._score);
  }

  toString(): string {
    return `${this._position}-${this._score}`;
  }
}

const PLAYER_ONE_START = 10;
const PLAYER_TWO_START = 9;

const day21 = () => {
  const player1 = new Player(PLAYER_ONE_START);
  const player2 = new Player(PLAYER_TWO_START);

  const die = new DeterministicDie();

  while (player1.score < 1000 && player2.score < 1000) {
    let moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player1.move(moveTotal);

    if (player1.score >= 1000) break;

    moveTotal = 0;
    for (let i = 0; i < 3; i++) {
      moveTotal += die.roll();
    }

    player2.move(moveTotal);
  }

  return die.numRolls * Math.min(player1.score, player2.score);
};

const winArray = [0, 0];
const memo: { [k: string]: number[] } = {};
const rTurn = (player1: Player, player2: Player, isPlayer1Turn: boolean) => {
  const key = `${player1}-${player2}-${isPlayer1Turn}`;

  if (memo[key]) return memo[key];

  if (player1.score > 20) {
    return [1, 0];
  } else if (player2.score > 20) {
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
