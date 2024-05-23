/**
 * Unique Paths II
 * https://www.naukri.com/code360/problems/maze-obstacles_977241
 * Problem statement
 * Given a ‘N’ * ’M’ maze with obstacles, count and return the number of unique paths to reach the right-bottom cell from the top-left cell. A cell in the given maze has a value '-1' if it is a blockage or dead-end, else 0. From a given cell, we are allowed to move to cells (i+1, j) and (i, j+1) only. Since the answer can be large, print it modulo 10^9 + 7.
 *
 * For Example :
 * Consider the maze below :
 * 0 0 0
 * 0 -1 0
 * 0 0 0
 *
 * There are two ways to reach the bottom left corner -
 *
 * (1, 1) -> (1, 2) -> (1, 3) -> (2, 3) -> (3, 3)
 * (1, 1) -> (2, 1) -> (3, 1) -> (3, 2) -> (3, 3)
 *
 * Hence the answer for the above test case is 2.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints :
 * 1 <= T <= 10
 * 1 <= N,M <= 200
 *
 * Note: It is guaranteed that the top-left cell does not have an obstacle.
 *
 * Time Limit: 1 sec
 * Sample Input 1 :
 * 2
 * 2 2
 * 0 0
 * 0 0
 * 3 3
 * 0 0 0
 * 0 -1 0
 * 0 0 0
 * Sample Output 1 :
 * 2
 * 2
 * Explanation For Sample Output 1 :
 * For the first test case, there are two possible paths to reach (2, 2) from (1, 1) :
 *     (1, 1) -> (1, 2) -> (2, 2)
 *     (1, 1) -> (2, 1) -> (2, 2)
 *
 * For the second test case, there are two ways to reach the bottom left corner -
 * (1, 1) -> (1, 2) -> (1, 3) -> (2, 3) -> (3, 3)
 * (1, 1) -> (2, 1) -> (3, 1) -> (3, 2) -> (3, 3)
 * Sample Input 2 :
 * 1
 * 2 2
 * 0 -1
 * -1  0
 * Sample Output 2 :
 * 0
 * https://leetcode.com/problems/unique-paths-ii/description/
 * You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
 *
 * An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.
 *
 * Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
 *
 * The testcases are generated so that the answer will be less than or equal to 2 * 109.
 */

// **************************************************** Recursion ********************************************
var uniquePathsWithObstacles = function (obstacleGrid) {
  function solve(m, n) {
    if (m === 0 && n === 0 && obstacleGrid[m][n] == 0) return 1;
    if (m < 0 || n < 0 || obstacleGrid[m][n] == 1) return 0;
    return solve(m - 1, n) + solve(m, n - 1);
  }
  return solve(obstacleGrid.length - 1, obstacleGrid[0].length - 1);
};

// **************************************************** Memoization ********************************************
var uniquePathsWithObstacles = function (obstacleGrid) {
  let rows = obstacleGrid.length;
  let cols = obstacleGrid[0].length;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(-1));

  function solve(m, n) {
    if (m === 0 && n === 0 && obstacleGrid[m][n] == 0) return 1;
    if (m < 0 || n < 0 || obstacleGrid[m][n] == 1) return 0;
    if (dp[m][n] !== -1) return dp[m][n];

    return (dp[m][n] = solve(m - 1, n) + solve(m, n - 1));
  }
  return solve(rows - 1, cols - 1);
};

// **************************************************** Tabulation ********************************************
var uniquePathsWithObstacles = function (obstacleGrid) {
  let rows = obstacleGrid.length;
  let cols = obstacleGrid[0].length;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0 && obstacleGrid[i][j] == 0) {
        dp[i][j] = 1;
        continue;
      }
      let left = i > 0 && obstacleGrid[i][j] == 0 ? dp[i - 1][j] : 0;
      let up = j > 0 && obstacleGrid[i][j] == 0 ? dp[i][j - 1] : 0;
      dp[i][j] = left + up;
    }
  }
  return dp[rows - 1][cols - 1];
};

// **************************************************** Space Optimization ********************************************
var uniquePathsWithObstacles = function (obstacleGrid) {
  let rows = obstacleGrid.length;
  let cols = obstacleGrid[0].length;
  let prev = Array(cols).fill(0);

  for (let i = 0; i < rows; i++) {
    const temp = Array(cols).fill(0);
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0 && obstacleGrid[i][j] == 0) {
        temp[j] = 1;
        continue;
      }
      let left = i > 0 && obstacleGrid[i][j] == 0 ? prev[j] : 0;
      let up = j > 0 && obstacleGrid[i][j] == 0 ? temp[j - 1] : 0;
      temp[j] = left + up;
    }
    prev = [...temp];
  }
  return prev[cols - 1];
};
