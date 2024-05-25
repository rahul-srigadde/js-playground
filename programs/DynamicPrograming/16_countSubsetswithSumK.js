/**
 * Count Subsets with Sum K
 * https://www.naukri.com/code360/problems/number-of-subsets_3952532
 * Problem statement
 * You are given an array 'arr' of size 'n' containing positive integers and a target sum 'k'.
 *
 *
 *
 * Find the number of ways of selecting the elements from the array such that the sum of chosen elements is equal to the target 'k'.
 *
 *
 *
 * Since the number of ways can be very large, print it modulo 10 ^ 9 + 7.
 *
 *
 *
 * Example:
 * Input: 'arr' = [1, 1, 4, 5]
 *
 * Output: 3
 *
 * Explanation: The possible ways are:
 * [1, 4]
 * [1, 4]
 * [5]
 * Hence the output will be 3. Please note that both 1 present in 'arr' are treated differently.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Sample Input 1 :
 * 4 5
 * 1 4 4 5
 *
 *
 * Sample Output 1 :
 *  3
 *
 *
 * Explanation For Sample Output 1:
 * The possible ways are:
 * [1, 4]
 * [1, 4]
 * [5]
 * Hence the output will be 3. Please note that both 1 present in 'arr' are treated differently.
 *
 *
 * Sample Input 2 :
 * 3 2
 * 1 1 1
 *
 *
 * Sample Output 2 :
 * 3
 *
 *
 * Explanation For Sample Output 1:
 * There are three 1 present in the array. Answer is the number of ways to choose any two of them.
 *
 *
 * Sample Input 3 :
 * 3 40
 * 2 34 5
 *
 *
 * Sample Output 3 :
 * 0
 *
 *
 * Expected time complexity :
 * The expected time complexity is O('n' * 'k').
 *
 *
 * Constraints:
 * 1 <= 'n' <= 100
 * 0 <= 'arr[i]' <= 1000
 * 1 <= 'k' <= 1000
 *
 * Time limit: 1 sec
 */
// **************************************************** Recursion ********************************************
function countSubsetswithSumK(arr, sum) {
  function solve(index, sum) {
    if (sum === 0) return 1;
    if (index === 0) return arr[index] === sum ? 1 : 0;

    const notTake = solve(index - 1, sum);
    const take = sum >= arr[index] ? solve(index - 1, sum - arr[index]) : 0;
    return notTake + take;
  }
  return solve(arr.length - 1, sum);
}
// **************************************************** Memoization ********************************************
function countSubsetswithSumK(arr, sum) {
  const dp = new Array.from({ length: arr.length }, () =>
    Array(sum + 1).fill(-1)
  );
  function solve(index, sum) {
    if (dp[index][sum] !== -1) return dp[index][sum];
    if (sum === 0) return 1;

    if (index === 0) return arr[index] === sum ? 1 : 0;

    const notTake = solve(index - 1, sum);
    const take = sum >= arr[index] ? solve(index - 1, sum - arr[index]) : 0;

    return (dp[index][sum] = notTake + take);
  }
  solve(arr.length - 1, sum);
  return dp[arr.length - 1][sum];
}
// **************************************************** Tabulation ********************************************

function countSubsetswithSumK(arr, sum) {
  const dp = new Array.from({ length: arr.length }, () =>
    Array(sum + 1).fill(0)
  );

  for (let i = 0; i < arr.length; i++) dp[i][0] = 1;

  if (arr[0] <= sum) dp[0][arr[0]] = 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < sum; j++) {
      const notTake = dp[i - 1][j];
      const take = sum >= arr[i] ? dp[i - 1][j - arr[i]] : 0;
      dp[i][j] = notTake + take;
    }
  }

  return dp[arr.length - 1][sum];
}

// **************************************************** Memoization ********************************************

function countSubsetswithSumK(arr, sum) {
  const prev = Array(sum + 1).fill(0);
  const curr = Array(sum + 1).fill(0);

  prev[0] = 1;
  curr[0] = 1;
  if (arr[0] <= sum) prev[arr[0]] = 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 1; j < sum; j++) {
      const notTake = prev[j];
      const take = sum >= arr[i] ? prev[j - arr[i]] : 0;
      curr[j] = notTake + take;
    }
    prev = [...curr];
  }

  return prev[sum];
}
// **************************************************** if the contraints changes it includes zeros as well ********************************************
// changing the base case
if (index === 0) {
  if (sum === 0 && arr[0] === 0) return 2;
  if (sum === 0 || arr[0] === 0) return 1;
  return 0;
}
