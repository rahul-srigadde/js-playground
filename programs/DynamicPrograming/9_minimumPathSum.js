/**
 * Minimum Path Sum
 * https://www.naukri.com/code360/problems/minimum-path-sum_985349
 * Problem statement
 * Ninjaland is a country in the shape of a 2-Dimensional grid 'GRID', with 'N' rows and 'M' columns. Each point in the grid has some cost associated with it.
 *
 *
 *
 * Find a path from top left i.e. (0, 0) to the bottom right i.e. ('N' - 1, 'M' - 1) which minimizes the sum of the cost of all the numbers along the path. You need to tell the minimum sum of that path.
 *
 *
 *
 * Note:
 * You can only move down or right at any point in time.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 <= T <= 100
 * 1 <= N, M <= 10^2
 * 1 <= GRID[i][j] <= 10^5
 *
 * Where 'GRID[i][j]' denotes the value of the cell in the matrix.
 *
 * Time limit: 1 sec
 * Sample Input 1:
 * 2
 * 2 3
 * 5 9 6
 * 11 5 2
 * 1 1
 * 5
 * Sample Output 1:
 * 21
 * 5
 * Explanation For Sample Output 1:
 * In test case 1, Consider a grid of 2*3:
 *
 * For this the grid the path with minimum value is (0,0) -> (0,1) -> (1,1) -> (1,2). And the sum along this path is 5 + 9 +5 + 2 = 21. So the ans is 21.
 *
 * In test case 2, The given grid is:
 *
 * For this the grid the path with minimum value is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2).The sum along this path is 1 + 2 + 3 + 4 + 9 = 19.
 * Sample Input 2:
 * 2
 * 2 2
 * 5 6
 * 1 2
 * 3 3
 * 1 2 3
 * 4 5 4
 * 7 5 9
 * Sample Output 2:
 * 8
 * 19
 * Explanation For Sample Output 2:
 * In test case 1, For this the grid the path with minimum value is (0,0) -> (1,0) -> (1,1). The sum along this path is 5 + 1 + 2 = 8.
 *
 * In test case 2, The given grid is:
 *
 * For this the grid the path with minimum value is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2).The sum along this path is 1 + 2 + 3 + 4 + 9 = 19.
 *
 */

// **************************************************** Recursion ********************************************

function minSumPath(r, c, matrix) {
  function solve(m, n) {
    if (m === 0 && n === 0) return matrix[m][n];
    if (m < 0 || n < 0) return Number.MAX_SAFE_INTEGER;
    const up = matrix[m][n] + solve(m - 1, n);
    const down = matrix[m][n] + solve(m, n - 1);
    return Math.min(up, down);
  }
  return solve(r - 1, c - 1);
}

// **************************************************** Memozation ********************************************

function minSumPath(r, c, matrix) {
  const dp = Array.from({ length: r }, () => new Array(c).fill(-1));

  function solve(m, n) {
    if (m === 0 && n === 0) return matrix[m][n];
    if (m < 0 || n < 0) return Number.MAX_SAFE_INTEGER;
    if (dp[m][n] !== -1) return dp[m][n];
    const up = matrix[m][n] + solve(m - 1, n);
    const down = matrix[m][n] + solve(m, n - 1);
    return (dp[m][n] = Math.min(up, down));
  }
  return solve(r - 1, c - 1);
}
// **************************************************** tabulation ********************************************

function minSumPath(r, c, matrix) {
  const dp = Array.from({ length: r }, () => new Array(c).fill(-1));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (i == 0 && j === 0) {
        dp[0][0] = matrix[i][j];
      } else {
        const up =
          i > 0 ? matrix[i][j] + dp[i - 1][j] : Number.MAX_SAFE_INTEGER;
        const down =
          j > 0 ? matrix[i][j] + dp[i][j - 1] : Number.MAX_SAFE_INTEGER;
        dp[i][j] = Math.min(up, down);
      }
    }
  }
  return dp[r - 1][c - 1];
}
// **************************************************** Space Optimazation ********************************************

function minSumPath(r, c, matrix) {
  const prev = new Array(c).fill(-1);
  for (let i = 0; i < r; i++) {
    const current = new Array(c).fill(-1);
    for (let j = 0; j < c; j++) {
      if (i == 0 && j === 0) {
        current[0] = matrix[i][j];
      } else {
        const up = i > 0 ? matrix[i][j] + prev[j] : Number.MAX_SAFE_INTEGER;
        const down =
          j > 0 ? matrix[i][j] + current[j - 1] : Number.MAX_SAFE_INTEGER;
        current[j] = Math.min(up, down);
      }
    }
    prev = [...current];
  }
  return prev[c - 1];
}
