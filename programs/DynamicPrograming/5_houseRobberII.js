/**
 *  House Robber II
 *  https://www.naukri.com/code360/problems/house-robber_839733?
 *  Problem statement
 * Mr. X is a professional robber planning to rob houses along a street. Each house has a certain amount of money hidden.
 *
 *
 *
 * All houses along this street are arranged in a circle. That means the first house is the neighbour of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses are broken into on the same night.
 *
 *
 *
 * You are given an array/list of non-negative integers 'ARR' representing the amount of money of each house. Your task is to return the maximum amount of money Mr. X can rob tonight without alerting the police.
 *
 *
 *
 * Note:
 * It is possible for Mr. X to rob the same amount of money by looting two different sets of houses. Just print the maximum possible robbed amount, irrespective of sets of houses robbed.
 *
 *
 * For example:
 * (i) Given the input array arr[] = {2, 3, 2} the output will be 3 because Mr X cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses. So, he’ll rob only house 2 (money = 3)
 *
 * (ii) Given the input array arr[] = {1, 2, 3, 1} the output will be 4 because Mr X rob house 1 (money = 1) and then rob house 3 (money = 3).
 *
 * (iii) Given the input array arr[] = {0} the output will be 0 because Mr. X has got nothing to rob.
 *
 * Constraints:
 * 1 <= T <= 10
 * 1 <= N <= 5 x 10 ^ 3
 * 1 <= ARR[i] <= 10 ^ 9
 *
 * Time limit: 1 sec.
 * Sample Input 1:
 * 3
 * 1
 * 0
 * 3
 * 2 3 2
 * 4
 * 1 3 2 1
 * Sample Output 1:
 * 0
 * 3
 * 4
 * Explanation of Input 1:
 * (i) Mr. X has only one house to rob, but with no money.
 *
 * (ii) Mr. X cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses (remember, it’s a circular street). So, he’ll rob only house 2 (money = 3) with a maximum value
 *
 * (iii) Mr. X will get maximum value when he robs house 2 (money = 3) and then robs house 4 (money = 1) i.e. 4 units of money.
 * Sample Input 2:
 * 3
 * 5
 * 1 5 1 2 6
 * 3
 * 2 3 5
 * 4
 * 1 3 2 0
 * Sample Output 2:
 * 11
 * 5
 * 3
 *
 */

// **************************************************** Memoization ********************************************

// Define the function to solve the problem
function solveUtil(ind, arr, dp) {
  // Check if the result for this index is already calculated
  if (dp[ind] !== -1) return dp[ind];

  // Base cases
  if (ind === 0) return arr[ind];
  if (ind < 0) return 0;

  // Calculate the maximum value by either picking or not picking the current element
  const pick = arr[ind] + solveUtil(ind - 2, arr, dp);
  const nonPick = 0 + solveUtil(ind - 1, arr, dp);

  // Store the result in the DP array and return it
  return (dp[ind] = Math.max(pick, nonPick));
}

// Main function to solve the problem
function solve(n, arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  // Initialize a DP array with -1
  const dp = new Array(n - 1).fill(-1);
  // Call the solveUtil function with the last index
  return Math.max(
    solveUtil(n - 2, arr.slice(0, n - 1), dp),
    solveUtil(n - 2, arr.slice(1), dp)
  );
}

// **************************************************** Tabulation ********************************************

// Function to solve the problem using dynamic programming
function solveUtil(n, arr, dp) {
  // Initialize the first element of dp with the first element of the array
  dp[0] = arr[0];

  // Loop through the array to fill the dp array
  for (let i = 1; i < n; i++) {
    // Calculate the maximum value when picking the current element
    let pick = arr[i];
    if (i > 1) {
      pick += dp[i - 2];
    }

    // Calculate the maximum value when not picking the current element
    const nonPick = dp[i - 1];

    // Store the maximum of pick and nonPick in dp
    dp[i] = Math.max(pick, nonPick);
  }

  // Return the result, which is the last element of dp
  return dp[n - 1];
}

// Main function to solve the problem
function solve(n, arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  // Initialize a DP array with the same length as the input array, filled with -1
  const dp = new Array(n - 1).fill(-1);
  // Call the solveUtil function to find the maximum sum
  Math.max(
    solveUtil(n - 1, arr.slice(0, n - 1), dp),
    solveUtil(n - 1, arr.slice(1), dp)
  );
}

// **************************************************** Space Optimization ********************************************

// Function to solve the problem
function solveUtil(n, arr) {
  // Initialize variables to keep track of the previous two maximum values
  let prev = arr[0];
  let prev2 = 0;

  // Loop through the array starting from the second element
  for (let i = 1; i < n; i++) {
    // Calculate the maximum value when picking the current element
    let pick = arr[i];
    if (i > 1) {
      pick += prev2;
    }

    // Calculate the maximum value when not picking the current element
    const nonPick = prev;

    // Calculate the current maximum value and update prev and prev2
    const cur_i = Math.max(pick, nonPick);
    prev2 = prev;
    prev = cur_i;
  }

  // Return the final maximum value
  return prev;
}
function solve(n, arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  // Call the solveUtil function to find the maximum sum
  return Math.max(
    solveUtil(n - 1, arr.slice(0, n - 1)),
    solveUtil(n - 1, arr.slice(1))
  );
}
