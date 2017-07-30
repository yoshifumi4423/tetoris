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
  currentX = 5;
  currentY = 0;
}



newGame();
