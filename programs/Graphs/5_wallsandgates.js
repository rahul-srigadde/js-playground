/**
 * 
 * https://leetcode.ca/all/286.html
 * Walls and Gates
 * You are given a m x n 2D grid initialized with these three possible values.

 * -1 - A wall or an obstacle.
 * 0 - A gate.
 * INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
 * Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

 * Example: 

 * Given the 2D grid:

 * INF  -1  0  INF
 * INF INF INF  -1
 * INF  -1 INF  -1
 *   0  -1 INF INF
 * After running your function, the 2D grid should be:

 *   3  -1   0   1
 *   2   2   1  -1
 *   1  -1   2  -1
 *   0  -1   3   4
 */
// ********************* DFS **********************************
var wallsAndGates = function (rooms) {
  if (!rooms) return;

  let rows = rooms.length,
    colums = rooms[0].length,
    visited = Array.from({ length: rows }, () => Array(colums).fill(false));

  function dfs(r, c, distance) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= colums ||
      visited[r][c] ||
      rooms[r][c] <= 0
    )
      return;

    visited[i][j] = true;
    rooms[i][j] = Math.min(rooms[i][j], distance);

    dfs(i - 1, j, distance + 1);
    dfs(i + 1, j, distance + 1);
    dfs(i, j - 1, distance + 1);
    dfs(i, j + 1, distance + 1);

    visited[i][j] = false;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      if (rooms[i][j] == 0) dfs(i, j, 0);
    }
  }
};

// ********************* DFS **********************************
