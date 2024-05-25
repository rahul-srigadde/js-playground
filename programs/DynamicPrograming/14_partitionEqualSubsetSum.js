/**
 * Partition Equal Subset Sum
 * https://www.naukri.com/code360/problems/partition-equal-subset-sum_892980
 * Problem statement
 * You are given an array 'ARR' of 'N' positive integers. Your task is to find if we can partition the given array into two subsets such that the sum of elements in both subsets is equal.
 *
 * For example, let’s say the given array is [2, 3, 3, 3, 4, 5], then the array can be partitioned as [2, 3, 5], and [3, 3, 4] with equal sum 10.
 *
 * Follow Up:
 *
 * Can you solve this using not more than O(S) extra space, where S is the sum of all elements of the given array?
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 <= 'T' <= 10
 * 1 <= 'N' <= 100
 * 1 <= 'ARR'[i] <= 100
 *
 * Time Limit: 1 sec
 * Sample Input 1:
 * 2
 * 6
 * 3 1 1 2 2 1
 * 5
 * 5 6 5 11 6
 * Sample Output 1:
 * true
 * false
 * Explanation Of Sample Input 1:
 * For the first test case, the array can be partitioned as ([2,1,1,1] and [3, 2]) or ([2,2,1], and [1,1,3]) with sum 5.
 *
 * For the second test case, the array can’t be partitioned.
 * Sample Input 2:
 * 2
 * 9
 * 2 2 1 1 1 1 1 3 3
 * 6
 * 8 7 6 12 4 5
 * Sample Output 2:
 * false
 * true
 */

// **************************************************** Recursion ********************************************
function partitionEqualSubsetSum(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  if (sum % 2 == 1) return false;
  const target = sum / 2;
  function solve(index, target) {
    if (target === 0) return true;
    if (index === 0) return arr[index] === target;

    const notTake = solve(index - 1, target);
    const take =
      target >= arr[index] ? solve(index - 1, target - arr[index]) : false;
    return notTake || take;
  }
  return solve(arr.length - 1, target);
}
// **************************************************** Memoization ********************************************
function partitionEqualSubsetSum(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  if (sum % 2 == 1) return false;
  const target = sum / 2;
  const dp = Array.from({ length: arr.length }, () =>
    new Array(target + 1).fill(-1)
  );
  function solve(index, target) {
    if (dp[index][target] !== -1) return dp[index][target];
    if (target === 0) return true;
    if (index === 0) return arr[index] === target;

    const notTake = solve(index - 1, target);
    const take =
      target >= arr[index] ? solve(index - 1, target - arr[index]) : false;
    return (dp[index][target] = notTake || take);
  }
  return solve(arr.length - 1, target);
}
// **************************************************** Tabulation ********************************************
function partitionEqualSubsetSum(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  if (sum % 2 == 1) return false;
  const target = sum / 2;
  const dp = Array.from({ length: arr.length }, () =>
    new Array(target + 1).fill(0)
  );
  for (let i = 0; i < arr.length; i++) dp[i][0] = true;
  if (arr[0] <= target) dp[0][arr[0]] = true;
  for (let i = 1; i < arr.length; i++) {
    for (let tar = 1; tar < target; tar++) {
      const notTake = dp[i - 1][tar];
      const take = tar >= arr[i] ? dp[i - 1][tar - arr[i]] : false;
      dp[i][tar] = notTake || take;
    }
  }
  return dp[arr.length - 1][target];
}
// **************************************************** Space Optimization ********************************************
function partitionEqualSubsetSum(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  if (sum % 2 == 1) return false;
  const target = sum / 2;
  let prev = new Array(target + 1).fill(0);
  let cur = new Array(target + 1).fill(0);

  prev[0] = true;
  cur[0] = true;
  if (arr[0] <= target) prev[arr[0]] = true;
  for (let i = 1; i < arr.length; i++) {
    for (let tar = 1; tar < target; tar++) {
      const notTake = prev[tar];
      const take = tar >= arr[i] ? prev[tar - arr[i]] : false;
      cur[tar] = notTake || take;
    }
    prev = [...cur];
  }
  return prev[target];
}
