/**
 * Maximum Path Sum in the matrix
 * https://www.naukri.com/code360/problems/maximum-path-sum-in-the-matrix_797998
 * Problem statement
 * You have been given an N*M matrix filled with integer numbers, find the maximum sum that can be obtained from a path starting from any cell in the first row to any cell in the last row.
 *
 * From a cell in a row, you can move to another cell directly below that row, or diagonally below left or right. So from a particular cell (row, col), we can move in three directions i.e.
 *
 * Down: (row+1,col)
 * Down left diagonal: (row+1,col-1)
 * Down right diagonal: (row+1, col+1)
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints :
 * 1 <= T <= 50
 * 1 <= N <= 100
 * 1 <= M <= 100
 * -10^4 <= matrix[i][j] <= 10^4
 *
 * Where 'T' is the number of test cases.
 * Where 'N' is the number of rows in the given matrix, and 'M' is the number of columns in the given matrix.
 * And, matrix[i][j] denotes the value at (i,j) cell in the matrix.
 *
 * Time Limit: 1sec
 * Input 1 :
 * 2
 * 4 4
 * 1 2 10 4
 * 100 3 2 1
 * 1 1 20 2
 * 1 2 2 1
 * 3 3
 * 10 2 3
 * 3 7 2
 * 8 1 5
 * Output 1 :
 * 105
 * 25
 * Explanation Of Input 1 :
 * In the first test case for the given matrix,
 *
 * The maximum path sum will be 2->100->1->2, So the sum is 105(2+100+1+2).
 *
 * In the second test case for the given matrix, the maximum path sum will be 10->7->8, So the sum is 25(10+7+8).
 * Input 2 :
 * 2
 * 3 3
 * 1 2 3
 * 9 8 7
 * 4 5 6
 * 4 6
 * 10 10 2 -13 20 4
 * 1 -9 -81 30 2 5
 * 0 10 4 -79 2 -10
 * 1 -5 2 20 -11 4
 * Output 2 :
 * 17
 * 74
 * Explanation Of Input 2 :
 * In the first test case for the given matrix, the maximum path sum will be 3->8->6, So the sum is 17(3+8+6).
 *
 * In the second test case for the given matrix, the maximum path sum will be 20->30->4->20, So the sum is 74(20+30+4+20).
 */

// **************************************************** Recursion ********************************************
function minSumPath(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let max = 0;
  function solve(m, n) {
    if (n < 0 || n > columns) return Number.MIN_SAFE_INTEGER;
    if (m === 0) return matrix[m][n];
    const up = matrix[m][n] + solve(m - 1, n);
    const left = matrix[m][n] + solve(m - 1, n - 1);
    const right = matrix[m][n] + solve(m - 1, n + 1);
    return Math.Max(up, left, right);
  }
  for (let j = 0; j < columns; j++) {
    max = Math.max(max, solve(rows - 1, j));
  }
  return max;
}
// **************************************************** Memozation ********************************************
function minSumPath(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dp = Array.from({ length: rows }, () => new Array(columns).fill(-1));
  let max = 0;

  function solve(i, j) {
    if (j < 0 || j > columns) return Number.MIN_SAFE_INTEGER;
    if (dp[i][j] !== -1) return dp[i][j];
    if (i === 0) return matrix[i][j];

    const up = matrix[i][j] + dp[i - 1][j];
    const left = matrix[i][j] + dp[i - 1][j - 1];
    const right = matrix[i][j] + dp[i - 1][j + 1];
    return (dp[i][j] = Math.max(up, left, right));
  }
  for (let j = 0; j < columns; j++) {
    max = Math.max(max, solve(rows - 1, j));
  }
  return max;
}
// **************************************************** tabulation ********************************************
function minSumPath(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dp = Array.from({ length: rows }, () => new Array(columns).fill(0));
  for (let j = 0; j < columns; j++) {
    dp[0][j] = matrix[0][j];
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const up = matrix[i][j] + dp[i - 1][j];
      const left =
        j - 1 > 0 ? matrix[i][j] + dp[i - 1][j - 1] : Number.MIN_SAFE_INTEGER;
      const right =
        j + 1 < columns
          ? matrix[i][j] + dp[i - 1][j + 1]
          : Number.MIN_SAFE_INTEGER;
      dp[i][j] = Math.max(up, left, right);
    }
  }
  return Math.max(...dp[rows - 1]);
}

// **************************************************** Space Optimazation ********************************************
function minSumPath(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const curr = new Array(columns).fill(0);
  for (let j = 0; j < columns; j++) {
    prev[j] = matrix[0][j];
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const up = matrix[i][j] + prev[j];
      const left =
        j - 1 > 0 ? matrix[i][j] + prev[j - 1] : Number.MIN_SAFE_INTEGER;
      const right =
        j + 1 < columns ? matrix[i][j] + prev[j + 1] : Number.MIN_SAFE_INTEGER;
      curr[j] = Math.max(up, left, right);
    }
    prev = curr;
  }
  return Math.max(...prev);
}
