/**
 * Partitions With Given Difference
 * https://www.naukri.com/code360/problems/partitions-with-given-difference_3751628
 * Problem statement
 * Given an array ‘ARR’, partition it into two subsets (possibly empty) such that their union is the original array. Let the sum of the elements of these two subsets be ‘S1’ and ‘S2’.
 *
 * Given a difference ‘D’, count the number of partitions in which ‘S1’ is greater than or equal to ‘S2’ and the difference between ‘S1’ and ‘S2’ is equal to ‘D’. Since the answer may be too large, return it modulo ‘10^9 + 7’.
 *
 * If ‘Pi_Sj’ denotes the Subset ‘j’ for Partition ‘i’. Then, two partitions P1 and P2 are considered different if:
 *
 * 1) P1_S1 != P2_S1 i.e, at least one of the elements of P1_S1 is different from P2_S2.
 * 2) P1_S1 == P2_S2, but the indices set represented by P1_S1 is not equal to the indices set of P2_S2. Here, the indices set of P1_S1 is formed by taking the indices of the elements from which the subset is formed.
 * Refer to the example below for clarification.
 * Note that the sum of the elements of an empty subset is 0.
 *
 * For example :
 * If N = 4, D = 3, ARR = {5, 2, 5, 1}
 * There are only two possible partitions of this array.
 * Partition 1: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
 * Partition 2: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
 * These two partitions are different because, in the 1st partition, S1 contains 5 from index 0, and in the 2nd partition, S1 contains 5 from index 2.
 * Input Format :
 * The first line contains a single integer ‘T’ denoting the number of test cases, then each test case follows:
 *
 * The first line of each test case contains two space-separated integers, ‘N’ and ‘D,’ denoting the number of elements in the array and the desired difference.
 *
 * The following line contains N integers denoting the space-separated integers ‘ARR’.
 * Output Format :
 * For each test case, find the number of partitions satisfying the above conditions modulo 10^9 + 7.
 * Output for each test case will be printed on a separate line.
 * Note :
 * You are not required to print anything; it has already been taken care of. Just implement the function.
 * Constraints :
 * 1 ≤ T ≤ 10
 * 1 ≤ N ≤ 50
 * 0 ≤ D ≤ 2500
 * 0 ≤ ARR[i] ≤ 50
 *
 * Time limit: 1 sec
 * Sample Input 1 :
 * 2
 * 4 3
 * 5 2 6 4
 * 4 0
 * 1 1 1 1
 * Sample Output 1 :
 * 1
 * 6
 * Explanation For Sample Input 1 :
 * For test case 1:
 * We will print 1 because :
 * There is only one possible partition of this array.
 * Partition : {6, 4}, {5, 2}. The subset difference between subset sum is: (6 + 4) - (5 + 2) = 3
 *
 * For test case 2:
 * We will print 6 because :
 * The partition {1, 1}, {1, 1} is repeated 6 times:
 * Partition 1 : {ARR[0], ARR[1]}, {ARR[2], ARR[3]}
 * Partition 2 : {ARR[0], ARR[2]}, {ARR[1], ARR[3]}
 * Partition 3 : {ARR[0], ARR[3]}, {ARR[1], ARR[2]}
 * Partition 4 : {ARR[1], ARR[2]}, {ARR[0], ARR[3]}
 * Partition 5 : {ARR[1], ARR[3]}, {ARR[0], ARR[2]}
 * Partition 6 : {ARR[2], ARR[3]}, {ARR[0], ARR[1]}
 * The difference is in the indices chosen for the subset S1(or S2).
 * Sample Input 2 :
 * 3
 * 3 1
 * 4 6 3
 * 5 0
 * 3 1 1 2 1
 * 5 1
 * 3 2 2 5 1
 * Sample Output 2 :
 * 1
 * 6
 * 3
 * s1 & s2 are subsets of the arr
 *
 * s1-s2 = d
 * s1+s2 = totalsum
 * 2s2 = totalsum - d
 * s2  = (totalsum-d)/2
 */
// **************************************************** Recursion ********************************************
function countPartitions(arr, difference) {
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
function countPartitions(arr, difference) {
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

function countSubsetswithSumK(arr, difference) {
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

function countSubsetswithSumK(arr, difference) {
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
