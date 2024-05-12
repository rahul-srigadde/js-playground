var maxAreaOfIsland = function (grid) {
  if (!grid.length) return 0;
  let maxArea = 0,
    rows = grid.length,
    columns = grid[0].length;

  function dfs(r, c) {
    if (r >= 0 && c >= 0 && r < rows && c < columns && grid[r][c] == "1") {
      grid[r][c] = 0;

      return 1 + dfs(r - 1, c) + dfs(r + 1, c) + dfs(r, c - 1) + dfs(r, c + 1);
    }
    return 0;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == "1") {
        let res = dfs(i, j);
        maxArea = Math.max(res, maxArea);
      }
    }
  }
  return maxArea;
};

const op1 = maxAreaOfIsland([
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]);
const op = maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]]);
console.log(op1);
console.log(op);
