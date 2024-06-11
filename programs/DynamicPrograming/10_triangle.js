/**
 * Triangle
 * https://www.naukri.com/code360/problems/triangle_1229398
 * Problem statement
 * You are given a triangular array/list 'TRIANGLE'. Your task is to return the minimum path sum to reach from the top to the bottom row.
 *
 * The triangle array will have N rows and the i-th row, where 0 <= i < N will have i + 1 elements.
 *
 * You can move only to the adjacent number of row below each step. For example, if you are at index j in row i, then you can move to i or i + 1 index in row j + 1 in each step.
 *
 * For Example :
 * If the array given is 'TRIANGLE' = [[1], [2,3], [3,6,7], [8,9,6,1]] the triangle array will look like:
 *
 * 1
 * 2,3
 * 3,6,7
 * 8,9,6,10
 *
 * For the given triangle array the minimum sum path would be 1->2->3->8. Hence the answer would be 14.
 *
 * Constraints :
 * 1 <= T <= 5
 * 1 <= N <= 10^3
 * -10^6 <= TRIANGLE[i][pos] <= 10^6 ,
 *
 * Where 'TRIANGLE[i][pos]' is the element at row = 'i' & position = 'pos' in triangle array.
 *
 * Time limit: 1 sec
 * Sample Input 1 :
 * 2
 * 4
 * 2
 * 3 4
 * 6 5 7
 * 4 1 8 3
 * 1
 * -10
 * Sample output 1 :
 * 11
 * -10
 * Sample Input explanation:
 * Test case 1:
 * Here our triangle array is:
 *
 * 2
 * 3 4
 * 6 5 7
 * 4 1 8 3
 *
 * In this array, the minimum path will be 2->3->5->1, so the minimum sum path would be 2+3+5+1=11
 *
 * Test case 2:
 * In this case, there is one row. Thus, the minimum path will be -10, and the minimum sum path=-10.
 * Sample input 2 :
 * 2
 * 4
 * 1
 * 2 3
 * 4 5 6
 * 7 8 9 10
 * 3
 * 5
 * -1 3
 * 22 1 -9
 * Sample Output 2 :
 * 14
 * -1
 *
 */
// **************************************************** Recursion ********************************************

function triangle(r = 0, c = 0, matrix) {
  const rows = matrix.length;
  function solve(m, n) {
    if (m === rows - 1) return matrix[m][n];
    const up = matrix[m][n] + solve(m + 1, n);
    const dg = matrix[m][n] + solve(m + 1, n + 1);
    return Math.min(up, dg);
  }
  return solve(r, c);
}

// **************************************************** Memoization ********************************************
function triangle(r = 0, c = 0, matrix) {
  const rows = matrix.length;
  const dp = Array.from({ length: rows }, () => new Array(rows).fill(-1));
  function solve(m, n) {
    if (m === rows - 1) return matrix[m][n];
    if (dp[m][n] !== -1) return dp[m][n];
    const up = matrix[m][n] + solve(m + 1, n);
    const dg = matrix[m][n] + solve(m + 1, n + 1);
    return (dp[m][n] = Math.min(up, dg));
  }
  return solve(r, c);
}

// **************************************************** Tabulation ********************************************
function triangle(r = 0, c = 0, matrix) {
  const rows = matrix.length;
  const dp = Array.from({ length: rows }, () => new Array(rows).fill(-1));
  for (let i = rows - 1; i >= 0; i--) {
    const cols = matrix[i].length;
    for (let j = cols - 1; j >= 0; j--) {
      if (i === rows - 1) {
        dp[i][j] = matrix[i][j];
      } else {
        const up = matrix[m][n] + dp[m + 1][n];
        const dg = matrix[m][n] + dp[m + 1][n + 1];
        dp[m][n] = Math.min(up, dg);
      }
    }
  }
  return dp[r][c];
}

// **************************************************** Space Optimization ********************************************
function triangle(r = 0, c = 0, matrix) {
  const rows = matrix.length;
  const prev = new Array(rows).fill(-1);
  for (let i = rows - 1; i >= 0; i--) {
    const cols = matrix[i].length;
    const current = new Array(cols).fill(-1);
    for (let j = cols - 1; j >= 0; j--) {
      if (i === rows - 1) {
        current[j] = matrix[i][j];
      } else {
        const up = matrix[m][n] + prev[n];
        const dg = matrix[m][n] + prev[n + 1];
        current[n] = Math.min(up, dg);
      }
    }
    prev = [...current];
  }
  return prev[c];
}
