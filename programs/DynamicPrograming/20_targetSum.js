/**
 * Target Sum
 * https://www.naukri.com/code360/problems/target-sum_4127362
 * Problem statement
 * You are given an array ‘ARR’ of ‘N’ integers and a target number, ‘TARGET’. Your task is to build an expression out of an array by adding one of the symbols '+' and '-' before each integer in an array, and then by concatenating all the integers, you want to achieve a target. You have to return the number of ways the target can be achieved.
 *
 * For Example :
 * You are given the array ‘ARR’ = [1, 1, 1, 1, 1], ‘TARGET’ = 3. The number of ways this target can be achieved is:
 * 1. -1 + 1 + 1 + 1 + 1 = 3
 * 2. +1 - 1 + 1 + 1 + 1 = 3
 * 3. +1 + 1 - 1 + 1 + 1 = 3
 * 4. +1 + 1 + 1 - 1 + 1 = 3
 * 5. +1 + 1 + 1 + 1 - 1 = 3
 * These are the 5 ways to make. Hence the answer is 5.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints :
 * 1 <= T <= 10
 * 1 <= N <= 25
 * -1000 <= TARGET <= 1000
 * 0 <= ARR[i] <= 1000
 *
 * Time Limit: 1 sec
 * Note :
 * You do not need to print anything. It has already been taken care of. Just implement the given function.
 * Sample input 1 :
 * 2
 * 5 3
 * 1 1 1 1 1
 * 4 3
 * 1 2 3 1
 * Sample Output 2 :
 * 5
 * 2
 * Explanation For Sample Input 1 :
 * For the first test case, ‘ARR’ = [1, 1, 1, 1, 1], ‘TARGET’ = 3. The number of ways this target can be achieved is:
 * 1. -1 + 1 + 1 + 1 + 1 = 3
 * 2. +1 - 1 + 1 + 1 + 1 = 3
 * 3. +1 + 1 - 1 + 1 + 1 = 3
 * 4. +1 + 1 + 1 - 1 + 1 = 3
 * 5. +1 + 1 + 1 + 1 - 1 = 3
 * These are the 5 ways to get the target. Hence the answer is 5.
 *
 * For the second test case, ‘ARR’ = [1, 2, 3, 1]. ‘TARGET’ = 3, The number of ways this target can be achieved is:
 * 1. +1 - 2 + 1 + 3 = 3
 * 2. -1 + 2 - 1 + 3 = 3
 * These are the 3 ways to get the target. Hence the answer is 2.
 * Sample Input 2 :
 * 2
 * 3 2
 * 1 2 3
 * 2 0
 * 1 1
 * Sample Output 2 :
 * 1
 * 2
 *
 *
 * ****** Idea behind this problem is if you divide the partion in two subsets such that s1-s2 =d that will be ans
 */
// **************************************************** Recursion ********************************************
function targetSum(arr, difference) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let sum = totalSum - difference;
  if (sum < 0 || sum % 2) return false;
  sum = sum / 2;

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
function targetSum(arr, difference) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let sum = totalSum - difference;
  if (sum < 0 || sum % 2) return false;
  sum = sum / 2;

  const dp = new Array.from({ length: arr.length }, () =>
    Array(sum + 1).fill(-1)
  );
  function solve(index, sum) {
    if (dp[index][sum] !== -1) return dp[index][sum];
    // if the contraints changes it includes zeros as well changing the base case
    if (index === 0) {
      if (sum === 0 && arr[0] === 0) return 2;
      if (sum === 0 || arr[0] === 0) return 1;
      return 0;
    }

    const notTake = solve(index - 1, sum);
    const take = sum >= arr[index] ? solve(index - 1, sum - arr[index]) : 0;

    return (dp[index][sum] = notTake + take);
  }
  solve(arr.length - 1, sum);
  return dp[arr.length - 1][sum];
}
// **************************************************** Tabulation ********************************************

function targetSum(arr, difference) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let sum = totalSum - difference;
  if (sum < 0 || sum % 2) return false;
  sum = sum / 2;

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

function targetSum(arr, difference) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let sum = totalSum - difference;
  if (sum < 0 || sum % 2) return false;
  sum = sum / 2;

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
