const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const W = 300;
const H = 600;
const BLOCK_W = W / COLS
const BLOCK_H = H / ROWS

function render() {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'black';

  for(let x = 0; x < COLS; ++x) {
    for(let y = 0; y < ROWS; ++y) {
      if(board[y][x]) {
        ctx.fillStyle = colors[board[y][x] - 1];
        drawBlock(x, y);
      }
    }
  }

  for(let y = 0; y < 4; ++y) {
    for(let x = 0; x < 4; ++x) {
      if(current[y][x]) {
        ctx.fillStyle = colors[current[y][x] - 1];
        drawBlock(currentX + x, currentY + y);
      }
    }
  }
}

setInterval(render, 30)

function drawBlock(x, y) {
  ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
  ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}
