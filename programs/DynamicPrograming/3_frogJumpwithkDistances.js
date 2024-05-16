/**
 * Frog Jump with k Distances
 * https://atcoder.jp/contests/dp/tasks/dp_b
 * Problem Statement
 * There are N stones, numbered 1,2,…,N. For each i (1≤i≤N), the height of Stone i is h(i)
 * There is a frog who is initially on Stone He will repeat the following action some number of times to reach Stone N:
 * Find the minimum possible total cost incurred before the frog reaches Stone N.
 *
 *
 */
//*********************************** memoization -dp **********************************

function solveUtil(ind, height, dp, k) {
  // Base case: If we are at the beginning (index 0), no cost is needed.
  if (ind === 0) return 0;
  // If the result for this index has been previously calculated, return it.
  if (dp[ind] !== -1) return dp[ind];

  let mmSteps = Infinity;

  // Loop to try all possible jumps from '1' to 'k'
  for (let j = 1; j <= k; j++) {
    // Ensure that we do not jump beyond the beginning of the array
    if (ind - j >= 0) {
      // Calculate the cost for this jump and update mmSteps with the minimum cost
      const jump =
        solveUtil(ind - j, height, dp, k) +
        Math.abs(height[ind] - height[ind - j]);
      mmSteps = Math.min(jump, mmSteps);
    }
  }
  // Store the minimum cost for this index in the dp array and return it.
  dp[ind] = mmSteps;
  return dp[ind];
}

function solve(n, height, k) {
  const dp = Array(n).fill(-1); // Initialize a memoization array to store calculated results
  return solveUtil(n - 1, height, dp, k); // Start the recursion from the last index
}

const height = [30, 10, 60, 10, 60, 50];
const n = height.length;
const k = 2;
const dp = Array(n).fill(-1); // Initialize a memoization array for the main function
console.log(solve(n, height, k)); // Print the result of the solve function

//*********************************** Tabluation -dp **********************************

// Define the solveUtil function to calculate the minimum steps required
function solveUtil(n, height, dp, k) {
  // Initialize the first element in dp to 0
  dp[0] = 0;

  // Loop through the height array from index 1 to n-1
  for (let i = 1; i < n; i++) {
    // Initialize mmSteps to a large value
    let mmSteps = Infinity;

    // Loop through the last k elements (backward jumps)
    for (let j = 1; j <= k; j++) {
      // Check if it's possible to jump to the previous element
      if (i - j >= 0) {
        // Calculate the cost of the jump and update mmSteps with the minimum cost
        const jump = dp[i - j] + Math.abs(height[i] - height[i - j]);
        mmSteps = Math.min(jump, mmSteps);
      }
    }

    // Store the minimum cost in dp for the current index
    dp[i] = mmSteps;
  }

  // Return the minimum cost to reach the last element
  return dp[n - 1];
}

// Define the solve function to initialize dp and call solveUtil
function solve(n, height, k) {
  // Initialize the dp array with -1
  const dp = new Array(n).fill(-1);

  // Call solveUtil to calculate the minimum cost
  return solveUtil(n, height, dp, k);
}
