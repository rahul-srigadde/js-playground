/**
 * https://leetcode.com/problems/number-of-islands/description/
 * Number of Islands
 * 
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), 
 * return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 * Example 1:
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 * Example 2:

 * Input: grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 * 

 * Constraints:

 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] is '0' or '1'.
 * 
 */
var numIslands = function (grid) {
  if (!grid.length) return 0;
  let rows = grid.length,
    columns = grid[0].length;
  let result = 0;
  let visited = {};
  function bfs(r, c) {
    let queue = [];
    queue.push([r, c]);
    visited[`row-${r}-column-${c}`] = true;
    while (queue.length) {
      let node = queue.shift();
      let row = node[0],
        col = node[1];
      let direction = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];
      direction.forEach((dir) => {
        let key = `row-${dir[0]}-column-${dir[1]}`;
        if (
          dir[0] >= 0 &&
          dir[1] >= 0 &&
          dir[0] < rows &&
          dir[1] < columns &&
          !visited[key] &&
          grid[dir[0]][dir[1]] === "1"
        ) {
          visited[key] = true;
          queue.push(dir);
        }
      });
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let key = `row-${i}-column-${j}`;
      if (grid[i][j] == "1" && !visited[key]) {
        bfs(i, j);
        result += 1;
      }
    }
  }
  return result;
};

var numIslands2 = function (grid) {
  let result = 0;

  if (!grid.length) return 0;
  let rows = grid.length,
    columns = grid[0].length;

  function dfs(r, c) {
    if (r >= 0 && c >= 0 && r < rows && c < columns && grid[r][c] == "1") {
      grid[r][c] = 0;
      dfs(r - 1, c);
      dfs(r + 1, c);
      dfs(r, c - 1);
      dfs(r, c + 1);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j);
        result += 1;
      }
    }
  }

  return result;
};

const op = numIslands2([
  ["1", "1", "1"],
  ["0", "1", "0"],
  ["1", "1", "1"],
]);
console.log(op);
