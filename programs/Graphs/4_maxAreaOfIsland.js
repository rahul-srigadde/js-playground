/**
 * https://leetcode.com/problems/max-area-of-island/description/
 * Max Area of Island
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

 * The area of an island is the number of cells with a value 1 in the island.

 * Return the maximum area of an island in grid. If there is no island, return 0.

 * 

 * Example 1:


 * Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * Output: 6
 * Explanation: The answer is not 11, because the island must be connected 4-directionally.
 * Example 2:

 * Input: grid = [[0,0,0,0,0,0,0,0]]
 * Output: 0
 * 

 * Constraints:

 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] is either 0 or 1.
 */
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
