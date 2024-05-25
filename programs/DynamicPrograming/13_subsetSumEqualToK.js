/**
 * Subset Sum Equal To K
 * https://www.naukri.com/code360/problems/subset-sum-equal-to-k_1550954
 * Problem statement
 * You are given an array/list ‘ARR’ of ‘N’ positive integers and an integer ‘K’. Your task is to check if there exists a subset in ‘ARR’ with a sum equal to ‘K’.
 *
 * Note: Return true if there exists a subset with sum equal to ‘K’. Otherwise, return false.
 *
 * For Example :
 * If ‘ARR’ is {1,2,3,4} and ‘K’ = 4, then there exists 2 subsets with sum = 4. These are {1,3} and {4}. Hence, return true.
 * Detailed explanation ( Input/output format, Notes, Images )
 * Constraints:
 * 1 <= T <= 5
 * 1 <= N <= 10^3
 * 0 <= ARR[i] <= 10^9
 * 0 <= K <= 10^3
 *
 * Time Limit: 1 sec
 * Sample Input 1:
 * 2
 * 4 5
 * 4 3 2 1
 * 5 4
 * 2 5 1 6 7
 * Sample Output 1:
 * true
 * false
 * Explanation For Sample Input 1:
 * In example 1, ‘ARR’ is {4,3,2,1} and ‘K’ = 5. There exist 2 subsets with sum = 5. These are {4,1} and {3,2}. Hence, return true.
 * In example 2, ‘ARR’ is {2,5,1,6,7} and ‘K’ = 4. There are no subsets with sum = 4. Hence, return false.
 * Sample Input 2:
 * 2
 * 4 4
 * 6 1 2 1
 * 5 6
 * 1 7 2 9 10
 * Sample Output 2:
 * true
 * false
 * Explanation For Sample Input 2:
 * In example 1, ‘ARR’ is {6,1,2,1} and ‘K’ = 4. There exist 1 subset with sum = 4. That is {1,2,1}. Hence, return true.
 * In example 2, ‘ARR’ is {1,7,2,9,10} and ‘K’ = 6. There are no subsets with sum = 6. Hence, return false.
 *
 *
 * Hints:
 * 1. Can you find every possible subset of ‘ARR’ and check if its sum is equal to ‘K’?
 * 2. Can you use dynamic programming and use the previously calculated result to calculate the new result?
 * 3. Try to use a recursive approach followed by memoization by including both index and sum we can form.
 */
// **************************************************** Recursion ********************************************
function subsetSumEqualToK(arr, target) {
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
function subsetSumEqualToK(arr, target) {
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
function subsetSumEqualToK(arr, target) {
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
function subsetSumEqualToK(arr, target) {
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
