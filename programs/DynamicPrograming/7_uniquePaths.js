/**
 * Unique Paths
 *
 * https://leetcode.com/problems/unique-paths/description/
 * There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
 *
 * Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
 *
 * The test cases are generated so that the answer will be less than or equal to 2 * 109.
 *
 * https://www.naukri.com/code360/problems/total-unique-paths_1081470
 * You are present at point ‘A’ which is the top-left cell of an M X N matrix, your destination is point ‘B’, which is the bottom-right cell of the same matrix. Your task is to find the total number of unique paths from point ‘A’ to point ‘B’.In other words, you will be given the dimensions of the matrix as integers ‘M’ and ‘N’, your task is to find the total number of unique paths from the cell MATRIX[0][0] to MATRIX['M' - 1]['N' - 1].
 *
 * To traverse in the matrix, you can either move Right or Down at each step. For example in a given point MATRIX[i] [j], you can move to either MATRIX[i + 1][j] or MATRIX[i][j + 1].
 *
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 ≤ T ≤ 100
 * 1 ≤ M ≤ 15
 * 1 ≤ N ≤ 15
 *
 * Where ‘M’ is the number of rows and ‘N’ is the number of columns in the matrix.
 *
 * Time limit: 1 sec
 *
 *
 *
 */

// **************************************************** Recursion ********************************************

function uniquePathsRecursion(r, c) {
  function solve(m, n) {
    if (m === 0 && n === 0) return 1;
    if (m < 0 || n < 0) return 0;
    return solve(m - 1, n) + solve(m, n - 1);
  }
  return solve(r - 1, c - 1);
}

// **************************************************** Memoization ********************************************
function uniquePathsMemoization(r, c) {
  const dp = Array.from({ length: r }, () => new Array(c).fill(-1));

  function solve(m, n) {
    if (m === 0 && n === 0) return 1;
    if (m < 0 || n < 0) return 0;
    if (dp[m][n] !== -1) return dp[m][n];
    return (dp[m][n] = solve(m - 1, n) + solve(m, n - 1));
  }
  return solve(r - 1, c - 1);
}

// **************************************************** Tabluation ********************************************
function uniquePathsTabulation(r, c) {
  const dp = Array.from({ length: r }, () => new Array(c).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (i === 0 && j === 0) {
        dp[0][0] = 1;
        continue;
      }
      let up = i > 0 ? dp[i - 1][j] : 0;
      let down = j > 0 ? dp[i][j - 1] : 0;
      dp[i][j] = up + down;
    }
  }
  return dp[r - 1][c - 1];
}

// **************************************************** Space Optimization ********************************************
function uniquePaths(r, c) {
  let prev = new Array(c).fill(0);
  for (let i = 0; i < r; i++) {
    const temp = Array(c).fill(0);
    for (let j = 0; j < c; j++) {
      if (i == 0 && j == 0) {
        temp[j] = 1;
        continue;
      }
      const up = i > 0 ? prev[j] : 0;
      const left = j > 0 ? temp[j - 1] : 0;
      temp[j] = up + left;
    }
    prev = [...temp];
  }
  return prev[c - 1];
}
console.log(uniquePaths(2, 2));
