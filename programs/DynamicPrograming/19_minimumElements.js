/**
 * Minimum Elements
 * Problem statement
 * You are given an array of ‘N’ distinct integers and an integer ‘X’ representing the target sum. You have to tell the minimum number of elements you have to take to reach the target sum ‘X’.
 *
 * Note:
 * You have an infinite number of elements of each type.
 * For example
 * If N=3 and X=7 and array elements are [1,2,3].
 * Way 1 - You can take 4 elements  [2, 2, 2, 1] as 2 + 2 + 2 + 1 = 7.
 * Way 2 - You can take 3 elements  [3, 3, 1] as 3 + 3 + 1 = 7.
 * Here, you can see in Way 2 we have used 3 coins to reach the target sum of 7.
 * Hence the output is 3.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 <= T <= 10
 * 1 <= N <= 15
 * 1 <= nums[i] <= (2^31) - 1
 * 1 <= X <= 10000
 *
 * All the elements of the “nums” array will be unique.
 * Time limit: 1 sec
 * Sample Input 1 :
 * 2
 * 3 7
 * 1 2 3
 * 1 0
 * 1
 * Sample output 1 :
 *  3
 *  0
 * Explanation For Sample Output 1:
 * For the first test case,
 * Way 1 - You can take 4 elements  [2, 2, 2, 1] as 2 + 2 + 2 + 1 = 7.
 * Way 2 - You can take 3 elements  [3, 3, 1] as 3 + 3 + 1 = 7.
 * Here, you can see in Way 2 we have used 3 coins to reach the target sum of 7.
 * Hence the output is 3.
 *
 * For the second test case,
 * Way 1 - You can take 3 elements  [1, 1, 1] as 1 + 1 + 1  = 3.
 * Way 2 - You can take 2 elements  [2, 1] as 2 + 1 = 3.
 * Here, you can see in Way 2 we have used 2 coins to reach the target sum of 7.
 * Hence the output is 2.
 * Sample Input 2 :
 * 2
 * 3 4
 * 12 1 3
 * 2 11
 * 2 1
 * Sample output 2 :
 * 2
 * 6
 *
 */
// **************************************************** Recursion ********************************************
function minimumElements(coins, target) {
  function solve(index, target) {
    if (index == 0) {
      if (target % coins[index] === 0) return target / coins[index];
      else Number.MAX_SAFE_INTEGER;
    }

    let notTake = 0 + solve(index - 1, target);
    let take = Number.MAX_SAFE_INTEGER;
    if (coins[index] <= target) {
      take = 1 + solve(index, target - coins[index]);
    }
    return Math.min(take, notTake);
  }
  const ans = solve(coins.length - 1, target);
  if (ans === Number.MAX_SAFE_INTEGER) return -1;
  return ans;
}
// **************************************************** Memozation ********************************************
function minimumElements(coins, givenTarget) {
  const dp = Array.from({ length: coins.length }, () =>
    Array(givenTarget + 1).fill(-1)
  );
  function solve(index, target) {
    if (index == 0) {
      if (target % coins[index] === 0) return target / coins[index];
      else Number.MAX_SAFE_INTEGER;
    }
    if (dp[index][target] !== -1) return dp[index][target];
    let notTake = 0 + solve(index - 1, target);
    let take = Number.MAX_SAFE_INTEGER;
    if (coins[index] <= target) {
      take = 1 + solve(index, target - coins[index]);
    }
    return (dp[index][target] = Math.min(take, notTake));
  }
  const ans = solve(coins.length - 1, givenTarget);
  if (ans === Number.MAX_SAFE_INTEGER) return -1;
  return ans;
}
// **************************************************** Tabulation ********************************************
function minimumElements(coins, givenTarget) {
  const dp = Array.from({ length: coins.length }, () =>
    Array(givenTarget + 1).fill(0)
  );
  for (let i = 0; i <= givenTarget; i++) {
    dp[0][i] =
      givenTarget % coins[0] === 0
        ? givenTarget / coins[0]
        : Number.MAX_SAFE_INTEGER;
  }
  for (let index = 1; index < coins.length; index++) {
    for (let target = 0; target <= givenTarget; target++) {
      let notTake = 0 + dp[index - 1][target];
      let take = Number.MAX_SAFE_INTEGER;
      if (coins[index] <= target) {
        take = 1 + dp[index][target - coins[index]];
      }
      dp[index][target] = Math.min(take, notTake);
    }
  }
  const ans = dp[coins.length - 1][givenTarget];
  if (ans === Number.MAX_SAFE_INTEGER) return -1;
  return ans;
}
// **************************************************** Space Optimization ********************************************
function minimumElements(coins, givenTarget) {
  const prev = Array(givenTarget + 1).fill(0);
  const cur = Array(givenTarget + 1).fill(0);

  for (let i = 0; i <= givenTarget; i++) {
    prev[i] =
      givenTarget % coins[i] === 0
        ? givenTarget / coins[i]
        : Number.MAX_SAFE_INTEGER;
  }
  for (let index = 1; index < coins.length; index++) {
    for (let target = 0; target <= givenTarget; target++) {
      let notTake = 0 + prev[target];
      let take = Number.MAX_SAFE_INTEGER;
      if (coins[index] <= target) {
        take = 1 + cur[target - coins[index]];
      }
      cur[target] = Math.min(take, notTake);
    }
    prev = [...cur];
  }
  if (prev[givenTarget] === Number.MAX_SAFE_INTEGER) return -1;
  return prev[givenTarget];
}
