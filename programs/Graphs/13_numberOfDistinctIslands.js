/**
 * https://www.geeksforgeeks.org/problems/number-of-distinct-islands/1
 * Number of Distinct Islands
 * Given a boolean 2D matrix grid of size n * m. You have to find the number of distinct islands where a group of connected 1s (horizontally or vertically) forms an island. Two islands are considered to be distinct if and only if one island is not equal to another (not rotated or reflected).

 * Example 1:

 * Input:
 * grid[][] = {{1, 1, 0, 0, 0},
 *             {1, 1, 0, 0, 0},
 *             {0, 0, 0, 1, 1},
              {0, 0, 0, 1, 1}}
 * Output:
 * 1
 * Explanation:
 * grid[][] = {{1, 1, 0, 0, 0}, 
 *             {1, 1, 0, 0, 0}, 
 *             {0, 0, 0, 1, 1}, 
 *             {0, 0, 0, 1, 1}}
 * Same colored islands are equal.
 * We have 2 equal islands, so we 
 * have only 1 distinct island.

 * Example 2:

 * Input:
 * grid[][] = {{1, 1, 0, 1, 1},
 *             {1, 0, 0, 0, 0},
 *             {0, 0, 0, 0, 1},
 *             {1, 1, 0, 1, 1}}
 * Output:
 * 3
 * Explanation:
 * grid[][] = {{1, 1, 0, 1, 1}, 
 *             {1, 0, 0, 0, 0}, 
 *             {0, 0, 0, 0, 1}, 
 *             {1, 1, 0, 1, 1}}
 * Same colored islands are equal.
 * We have 4 islands, but 2 of them
 * are equal, So we have 3 distinct islands.

 * Your Task:

 * You don't need to read or print anything. Your task is to complete the function countDistinctIslands() 
 * which takes the grid as an input parameter and returns the total number of distinct islands.

 * Expected Time Complexity: O(n * m)
 * Expected Space Complexity: O(n * m)

 * Constraints:
 * 1 ≤ n, m ≤ 500
 * grid[i][j] == 0 or grid[i][j] == 1
 */
var numDistinctIslands = function (grid) {
  let rows = grid.length,
    columns = grid[0].length;
  let distinctIslands = new Set();
  let islands = [];
  let visited = Array.from({ length: rows }, () => Array(columns).fill(0));
  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function dfs(r, c, rp, cp, islands) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= columns ||
      visited[r][c] === 1 ||
      grid[r][c] === 0
    )
      return;
    visited[r][c] = 1;
    islands.push([r - rp, c - cp]);
    direction.forEach(([dr, dc]) => {
      const row = r + dr;
      const col = c + dc;
      dfs(row, col, rp, cp, islands);
    });
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == 1 && visited[i][j] === 0) {
        islands = [];
        dfs(i, j, i, j, islands);
        distinctIslands.add(JSON.stringify(islands));
      }
    }
  }
  return distinctIslands.size;
};

const arr = [
  [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
  ],
  [
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
  ],
];

arr.forEach((x) => {
  const op = numDistinctIslands(x);

  console.log(op);
});
