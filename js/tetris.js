const COLS = 10;
const ROWS = 20;
const board = [];
let lose;
let intervalId;
let current;
let currentX;
let currentY;

const shapes = [
  [1, 1, 1, 1],
  [1, 1, 1, 0,
   1],
  [1, 1, 1, 0,
   0, 0, 1],
  [1, 1, 0, 0,
   0, 1, 1],
  [0, 1, 1, 0,
   1, 1],
  [0, 1, 0, 0,
   1, 1, 1]
];

const colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

function newGame() {
  clearInterval(intervalId);
  init();
  newShape();
  lose = false;
  intervalId = setInterval(tick, 250);
}

function init() {
  for(let y = 0; y < ROWS; ++y) {
    board[y] = [];
    for(let x = 0; x < COLS; ++x) {
      board[y][x] = 0;
    }
  }
}

function newShape() {
  let id = Math.floor(Math.random() * shapes.length);
  let shape = shapes[id];

  current = [];
  for(let y = 0; y < 4; ++y) {
    current[y] = [];
    for(let x = 0; x < 4; ++x) {
      let i = 4 * y + x;
      if(typeof shape[i] !== 'undefined' && shape[i]) {
        current[y][x] = id + 1;
      } else {
        current[y][x] = 0;
      }
    }
  }
  currentX = 3;
  currentY = 0;
}

function tick() {
  if(valid(0, 1)) {
    ++currentY;
  } else {
    freeze();
    clearLines();
    if(lose) {
      newGame();
      return false;
    }

    newShape();
  }
}

function valid(offsetX = 0 , offsetY = 0, newCurrent = current) {
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  for(let y = 0; y < 4; ++y) {
    for(let x = 0; x < 4; ++x) {
      if(newCurrent[y][x]) {
        if(typeof board[y + offsetY] === 'undefined' || // if 枠の外
           typeof board[y + offsetY][x + offsetX] === 'undefined' || // if 枠の外
           board[y + offsetY][x + offsetX] // if ブロックがすでに積まれている
           // NOTE: ↓不要と思われるため、いったんコメントアウト
           // || x + offsetX < 0 || y + offsetY >= ROWS || x + offsetX >= COLS
           ) {
          if(offsetY === 1 && offsetX - currentX === 0 && offsetY - currentY === 1) {
            console.log('game over');
            lose = true;
          }
          return false
        }
      }
    }
  }
  return true;
}

function freeze() {
  for(let y = 0; y < 4; ++y) {
    for(let x = 0; x < 4; ++x) {
      if(current[y][x]) board[y + currentY][x + currentX] = current[y][x];
    }
  }
}

function clearLines() {
  for(let y = ROWS - 1; y >= 0; --y) {
    let rowFilled = true;
    for(let x = 0; x < COLS; ++x) {
      if(board[y][x] === 0) {
        rowFilled = false;
        break;
      }
    }

    if(rowFilled) {
      // document.getElementById( 'clearsound' ).play();
      for(let yy = y; yy > 0; --y) {
        for(let x = 0; x < COLS; ++x) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y;
    }
  }
}

newGame();
