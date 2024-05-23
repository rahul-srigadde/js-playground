/**
 * Maximum sum of non-adjacent elements
 * https://www.naukri.com/code360/problems/maximum-sum-of-non-adjacent-elements_843261
 * Problem statement
 * You are given an array/list of ‘N’ integers. You are supposed to return the maximum sum of the subsequence with the constraint that no two elements are adjacent in the given array/list.
 *
 * Note:
 * A subsequence of an array/list is obtained by deleting some number of elements (can be zero) from the array/list, leaving the remaining elements in their original order.
 * Constraints:
 * 1 <= T <= 500
 * 1 <= N <= 1000
 * 0 <= ARR[i] <= 10^5
 *
 * Where 'ARR[i]' denotes the 'i-th' element in the array/list.
 *
 * Time Limit: 1 sec.
 * Sample Input 1:
 * 2
 * 3
 * 1 2 4
 * 4
 * 2 1 4 9
 * Sample Output 1:
 * 5
 * 11
 * Explanation to Sample Output 1:
 * In test case 1, the sum of 'ARR[0]' & 'ARR[2]' is 5 which is greater than 'ARR[1]' which is 2 so the answer is 5.
 *
 * In test case 2, the sum of 'ARR[0]' and 'ARR[2]' is 6, the sum of 'ARR[1]' and 'ARR[3]' is 10, and the sum of 'ARR[0]' and 'ARR[3]' is 11. So if we take the sum of 'ARR[0]' and 'ARR[3]', it will give the maximum sum of sequence in which no elements are adjacent in the given array/list.
 * Sample Input 2:
 * 2
 * 5
 * 1 2 3 5 4
 * 9
 * 1 2 3 1 3 5 8 1 9
 * Sample Output 2:
 * 8
 * 24
 * Explanation to Sample Output 2:
 * In test case 1, out of all the possibilities, if we take the sum of 'ARR[0]', 'ARR[2]' and 'ARR[4]', i.e. 8, it will give the maximum sum of sequence in which no elements are adjacent in the given array/list.
 *
 * In test case 2, out of all the possibilities, if we take the sum of 'ARR[0]', 'ARR[2]', 'ARR[4]', 'ARR[6]' and 'ARR[8]', i.e. 24 so, it will give the maximum sum of sequence in which no elements are adjacent in the given array/list.
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
  // Initialize a DP array with -1
  const dp = new Array(n).fill(-1);
  // Call the solveUtil function with the last index
  return solveUtil(n - 1, arr, dp);
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
  // Initialize a DP array with the same length as the input array, filled with -1
  const dp = new Array(n).fill(-1);
  // Call the solveUtil function to find the maximum sum
  return solveUtil(n, arr, dp);
}

// **************************************************** Space Optimization ********************************************

// Function to solve the problem
function solve(n, arr) {
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
