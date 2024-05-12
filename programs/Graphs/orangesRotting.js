var orangesRotting1 = function (grid) {
  if (!grid) return -1;
  let rows = grid.length,
    columns = grid[0].length,
    minutes = 0,
    fresh = 0;

  let queue = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == 2) {
        queue.push([i, j]);
      } else if (grid[i][j] == 1) {
        fresh++;
      }
    }
  }
  while (queue.length) {
    let rotten = [];
    queue.forEach((x) => {
      let [r, c] = x;
      const direction = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      direction.forEach((dir) => {
        const dx = r + dir[0];
        const dy = c + dir[1];
        if (
          dx >= 0 &&
          dx < rows &&
          dy >= 0 &&
          dy < columns &&
          grid[dx][dy] == 1
        ) {
          grid[dx][dy] = 2;
          rotten.push([dx, dy]);
        }
      });
    });
    if (rotten.length) {
      minutes++;
      queue = rotten;
      fresh = fresh - rotten.length;
    } else {
      queue = [];
    }
  }
  return fresh ? -1 : minutes;
};

var orangesRotting = function (grid) {
  if (!grid) return -1;
  let rows = grid.length,
    columns = grid[0].length,
    minutes = 0,
    queue = [],
    fresh = 0,
    direction = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == 2) queue.push([i, j, 0]);
      else if (grid[i][j] == 1) fresh++;
    }
  }
  while (queue.length) {
    const ele = queue.shift();
    const [r, c, m] = ele;
    minutes = Math.max(minutes, m);
    direction.forEach((dir) => {
      const dr = r + dir[0],
        dc = c + dir[1];
      if (
        dr >= 0 &&
        dr < rows &&
        dc >= 0 &&
        dc < columns &&
        grid[dr][dc] == 1
      ) {
        fresh--;
        grid[dr][dc] = 2;
        queue.push([dr, dc, m + 1]);
      }
    });
  }
  return fresh ? -1 : minutes;
};
const op1 = orangesRotting1([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]);
const op = orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]);
console.log(op1);
console.log(op);
