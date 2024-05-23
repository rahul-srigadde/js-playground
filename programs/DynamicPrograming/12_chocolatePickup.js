/**
 * Chocolate Pickup
 * https://www.naukri.com/code360/problems/ninja-and-his-friends_3125885
 * Problem statement
 * Ninja has a 'GRID' of size 'R' X 'C'. Each cell of the grid contains some chocolates. Ninja has two friends Alice and Bob, and he wants to collect as many chocolates as possible with the help of his friends.
 *
 * Initially, Alice is in the top-left position i.e. (0, 0), and Bob is in the top-right place i.e. (0, ‘C’ - 1) in the grid. Each of them can move from their current cell to the cells just below them. When anyone passes from any cell, he will pick all chocolates in it, and then the number of chocolates in that cell will become zero. If both stay in the same cell, only one of them will pick the chocolates in it.
 *
 * If Alice or Bob is at (i, j) then they can move to (i + 1, j), (i + 1, j - 1) or (i + 1, j + 1). They will always stay inside the ‘GRID’.
 *
 * Your task is to find the maximum number of chocolates Ninja can collect with the help of his friends by following the above rules.
 *
 * Example:
 * Input: ‘R’ = 3, ‘C’ = 4
 *        ‘GRID’ = [[2, 3, 1, 2], [3, 4, 2, 2], [5, 6, 3, 5]]
 * Output: 21
 *
 * Initially Alice is at the position (0,0) he can follow the path (0,0) -> (1,1) -> (2,1) and will collect 2 + 4 + 6 = 12 chocolates.
 *
 * Initially Bob is at the position (0, 3) and he can follow the path (0, 3) -> (1,3) -> (2, 3) and will colllect 2 + 2 + 5 = 9 chocolates.
 *
 * Hence the total number of chocolates collected will be 12 + 9 = 21. there is no other possible way to collect a greater number of chocolates than 21.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints :
 * 1 <= ‘T’ <= 10
 * 2 <= 'R', 'C' <= 50
 * 0 <= 'GRID[i][j]'<= 10^2
 * Time Limit: 1sec
 * Sample Input 1 :
 * 2
 * 3 4
 * 2 3 1 2
 * 3 4 2 2
 * 5 6 3 5
 * 2 2
 * 1 1
 * 1 2
 * Sample Output 1 :
 * 21
 * 5
 * Explanation Of Sample Input 1 :
 * For the first test case, Initially Alice is at the position (0, 0) he can follow the path (0, 0) -> (1, 1) -> (2, 1) and will collect 2 + 4 + 6 = 12 chocolates.
 *
 * Initially Bob is at the position (0, 3) and he can follow the path (0, 3) -> (1, 3) -> (2, 3) and will collect 2 + 2 + 5 = 9 chocolates.
 *
 * Hence the total number of chocolates collected will be 12 + 9 = 21.
 *
 * For the second test case, Alice will follow the path (0, 0) -> (1, 0) and Bob will follow the path (0, 1) -> (1, 1). total number of chocolates collected will be 1 + 1 + 1 + 2 = 5
 * Sample Input 2 :
 * 2
 * 2 2
 * 3 7
 * 7 6
 * 3 2
 * 4 5
 * 3 7
 * 4 2
 * Sample Output 2 :
 * 23
 * 25
 *
 *
 */
// **************************************************** Recursion ********************************************
function chocolatePickUp(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dir = [-1, 0, 1];

  function solve(i, j1, j2) {
    if (j1 < 0 || j1 >= columns || j2 < 0 || j2 >= columns) {
      return Number.MIN_SAFE_INTEGER;
    }
    if (i == rows - 1) {
      if (j1 === j2) return matrix[i][j1];
      else return matrix[i][j1] + matrix[i][j2];
    }
    let max = 0;
    for (let dr of dir) {
      for (let dc of dir) {
        if (j1 === j2) {
          max = Math.max(max, matrix[i][j1] + solve(i + 1, j1 + dr, j2 + dc));
        } else {
          max = Math.max(
            max,
            matrix[i][j1] + matrix[i][j2] + solve(i + 1, j1 + dr, j2 + dc)
          );
        }
      }
    }
    return max;
  }
  return solve(0, 0, columns - 1);
}

// **************************************************** Memoization ********************************************
function chocolatePickUp(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dir = [-1, 0, 1];

  const dp = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => new Array(columns).fill(-1))
  );

  function solve(i, j1, j2) {
    if (j1 < 0 || j1 >= columns || j2 < 0 || j2 >= columns) {
      return Number.MIN_SAFE_INTEGER;
    }
    if (i == rows - 1) {
      if (j1 === j2) return matrix[i][j1];
      else return matrix[i][j1] + matrix[i][j2];
    }
    if (dp[i][j1][j2] !== -1) return dp[i][j1][j2];
    let max = 0;
    for (let dr of dir) {
      for (let dc of dir) {
        if (j1 === j2) {
          max = Math.max(max, matrix[i][j1] + solve(i + 1, j1 + dr, j2 + dc));
        } else {
          max = Math.max(
            max,
            matrix[i][j1] + matrix[i][j2] + solve(i + 1, j1 + dr, j2 + dc)
          );
        }
      }
    }
    return (dp[i][j1][j2] = max);
  }
  return solve(0, 0, columns - 1);
}

// **************************************************** Tabulation ********************************************
function chocolatePickUp(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dir = [-1, 0, 1];

  const dp = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => new Array(columns).fill(0))
  );

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < columns; j++) {
      if (i == j) {
        dp[rows - 1][i][j] = matrix[rows - 1][j];
      } else {
        dp[rows - 1][i][j] = matrix[rows - 1][i] + matrix[rows - 1][j];
      }
    }
  }
  for (let i = rows - 2; i >= 0; i--) {
    for (let j1 = 0; j < columns; j1++) {
      for (let j2 = 0; j < columns; j2++) {
        let max = 0;
        for (let dr of dir) {
          for (let dc of dir) {
            let value = 0;
            if (j1 === j2) {
              value = matrix[i][j1];
            } else {
              value = matrix[i][j1] + matrix[i][j2];
            }
            if (
              j1 + dr >= 0 &&
              j1 + dr < columns &&
              j2 + dc >= 0 &&
              j2 + dc < columns
            )
              value = value + dp[i + 1][j1 + dr][j2 + dc];
            else value = Number.MIN_SAFE_INTEGER;
            max = Math.max(max, value);
          }
        }
        dp[i][j1][j2] = max;
      }
    }
  }
  return dp[0][0][columns - 1];
}
// **************************************************** Space Optimization ********************************************
function chocolatePickUp(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const dir = [-1, 0, 1];

  const current = Array.from({ length: columns }, () =>
    new Array(columns).fill(0)
  );
  const front = Array.from({ length: columns }, () =>
    new Array(columns).fill(0)
  );

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < columns; j++) {
      if (i == j) {
        front[i][j] = matrix[rows - 1][j];
      } else {
        front[i][j] = matrix[rows - 1][i] + matrix[rows - 1][j];
      }
    }
  }
  for (let i = rows - 2; i >= 0; i--) {
    for (let j1 = 0; j < columns; j1++) {
      for (let j2 = 0; j < columns; j2++) {
        let max = 0;
        for (let dr of dir) {
          for (let dc of dir) {
            let value = 0;
            if (j1 === j2) {
              value = matrix[i][j1];
            } else {
              value = matrix[i][j1] + matrix[i][j2];
            }
            if (
              j1 + dr >= 0 &&
              j1 + dr < columns &&
              j2 + dc >= 0 &&
              j2 + dc < columns
            )
              value = value + front[j1 + dr][j2 + dc];
            else value = Number.MIN_SAFE_INTEGER;
            max = Math.max(max, value);
          }
        }
        current[j1][j2] = max;
      }
    }
    front = [...current];
  }
  return front[0][columns - 1];
}
