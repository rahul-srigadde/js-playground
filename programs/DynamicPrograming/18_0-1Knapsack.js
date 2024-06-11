/**
 * 0-1Knapsack
 * Problem statement
 * A thief is robbing a store and can carry a maximal weight of W into his knapsack.
 * There are N items and the ith item weighs wi and is of value vi.
 * Considering the constraints of the maximum weight that a knapsack can carry,
 * you have to find and return the maximum value that a thief can generate by stealing items.
 *
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 <= T <= 10
 * 1 <= N <= 10^2
 * 1<= wi <= 50
 * 1 <= vi <= 10^2
 * 1 <= W <= 10^3
 *
 * Time Limit: 1 second
 * Sample Input:
 * 1
 * 4
 * 1 2 4 5
 * 5 4 8 6
 * 5
 * Sample Output:
 * 13
 */
// **************************************************** Recursion ********************************************
function Knapsack(wt, val, n, W) {
  function solve(index, weight) {
    if (index == 0) {
      if (wt[index] <= weight) return val[index];
      return 0;
    }
    const notTake = 0 + solve(index - 1, weight);
    let take = Number.MIN_SAFE_INTEGER;

    if (wt[index] <= weight)
      take = val[index] + solve(index - 1, weight - wt[index]);

    return Math.max(notTake, take);
  }
  return solve(n - 1, W);
}
// **************************************************** Memozation ********************************************
function Knapsack(wt, val, n, W) {
  const dp = Array.from({ length: n }, () => Array(W + 1).fill(-1));
  function solve(index, weight) {
    if (index == 0) {
      if (wt[index] <= weight) return val[index];
      return 0;
    }
    if (dp[index][weight] !== -1) return dp[index];
    const notTake = 0 + solve(index - 1, weight);
    let take = Number.MIN_SAFE_INTEGER;

    if (wt[index] <= weight)
      take = val[index] + solve(index - 1, weight - wt[index]);

    return (dp[index][weight] = Math.max(notTake, take));
  }
  return solve(n - 1, W);
}
// **************************************************** Tabulation ********************************************
function Knapsack(wt, val, n, W) {
  const dp = Array.from({ length: n }, () => Array(W + 1).fill(-1));
  for (let i = wt[0]; i <= W; i++) {
    dp[0][i] = val[0];
  }
  for (let index = 1; index < n; index++) {
    for (let weight = 0; weight <= W; weight++) {
      const notTake = 0 + dp[index - 1][weight];
      let take = Number.MIN_SAFE_INTEGER;

      if (wt[index] <= weight)
        take = val[index] + dp[index - 1][weight - wt[index]];

      dp[index][weight] = Math.max(notTake, take);
    }
  }
  return dp[n - 1][wt];
}
// **************************************************** Space optimization ********************************************
function Knapsack(wt, val, n, W) {
  const prev = new Array(W + 1).fill(0);
  const cur = new Array(W + 1).fill(0);
  for (let i = wt[0]; i <= W; i++) {
    prev[i] = val[0];
  }
  for (let index = 1; index < n; index++) {
    for (let weight = 0; weight <= W; weight++) {
      const notTake = 0 + prev[weight];
      let take = Number.MIN_SAFE_INTEGER;

      if (wt[index] <= weight) take = val[index] + prev[weight - wt[index]];

      cur[weight] = Math.max(notTake, take);
    }
    prev = [...cur];
  }
  return prev[wt];
}
// **************************************************** Space optimization 2********************************************
function Knapsack(wt, val, n, W) {
  const prev = new Array(W + 1).fill(0);
  for (let i = wt[0]; i <= W; i++) {
    prev[i] = val[0];
  }
  for (let index = 1; index < n; index++) {
    for (let weight = 0; weight <= W; weight++) {
      const notTake = 0 + prev[weight];
      let take = Number.MIN_SAFE_INTEGER;

      if (wt[index] <= weight) take = val[index] + prev[weight - wt[index]];

      prev[weight] = Math.max(notTake, take);
    }
  }
  return prev[wt];
}
