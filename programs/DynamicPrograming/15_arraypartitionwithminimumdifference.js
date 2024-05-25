/**
 * Array partition with minimum difference
 * https://www.naukri.com/code360/problems/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum_842494
 * Problem statement
 * You are given an array 'arr' containing 'n' non-negative integers.
 *
 *
 *
 * Your task is to partition this array into two subsets such that the absolute difference between subset sums is minimum.
 *
 *
 *
 * You just need to find the minimum absolute difference considering any valid division of the array elements.
 *
 *
 *
 * Note:
 *
 * 1. Each array element should belong to exactly one of the subsets.
 *
 * 2. Subsets need not always be contiguous.
 * For example, for the array : [1, 2, 3], some of the possible divisions are
 *    a) {1,2} and {3}
 *    b) {1,3} and {2}.
 *
 * 3. Subset-sum is the sum of all the elements in that subset.
 * Example:
 * Input: 'n' = 5, 'arr' = [3, 1, 5, 2, 8].
 *
 * Ouput: 1
 *
 * Explanation: We can partition the given array into {3, 1, 5} and {2, 8}.
 * This will give us the minimum possible absolute difference i.e. (10 - 9 = 1).
 * Detailed explanation ( Input/output format, Notes, Images )
 * Sample Input 1:
 * 4
 * 1 2 3 4
 * Sample Output 1:
 * 0
 * Explanation for sample input 1:
 * We can partition the given array into {2,3} and {1,4}.
 * This will give us the minimum possible absolute difference i.e. (5 - 5 = 0) in this case.
 * Sample Input 2:
 * 3
 * 8 6 5
 * Sample Output 2:
 * 3
 * Explanation for sample input 2:
 * We can partition the given array into {8} and {6,5}.
 * This will give us the minimum possible absolute difference i.e. (11 - 8 = 3).
 * Expected time complexity:
 * The expected time complexity is O(n * 𝚺 'arr'[i]), where 𝚺 'arr'[i] denotes the sum of all elements in 'arr'.
 * Constraints:
 * 1 <= 'n' <= 10^3
 * 0 <= 'arr'[i] <= 10^3
 * 0 <= 𝚺 'arr'[i] <= 10^4,
 *
 * where 𝚺 'arr'[i] denotes the sum of all elements in 'arr'.
 *
 * Time Limit: 1sec
 */

// **************************************************** Tabulation ********************************************
function arraypartitionwithminimumdifference(arr) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  const dp = Array.from({ length: arr.length }, () =>
    new Array(totalSum + 1).fill(0)
  );
  for (let i = 0; i < arr.length; i++) dp[i][0] = true;
  if (arr[0] <= true) dp[0][arr[0]] = true;
  for (let i = 1; i < arr.length; i++) {
    for (let tar = 1; tar < totalSum; tar++) {
      const notTake = dp[i - 1][tar];
      const take = tar >= arr[i] ? dp[i - 1][tar - arr[i]] : false;
      dp[i][tar] = notTake || take;
    }
  }

  let minimum = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < totalSum / 2; i++) {
    if (dp[arr.length - 1][i]) {
      // here i is the target sum since dp[i][j] represent index & target dp
      minimum = Math.min(minimum, Math.abs(totalSum - i - i));
    }
  }
  return minimum;
}

// **************************************************** Space Optimization ********************************************
function arraypartitionwithminimumdifference(arr) {
  const totalSum = arr.reduce((a, b) => a + b, 0);
  let prev = new Array(totalSum + 1).fill(0);
  let cur = new Array(totalSum + 1).fill(0);

  prev[0] = true;
  cur[0] = true;
  if (arr[0] <= target) prev[arr[0]] = true;
  for (let i = 1; i < arr.length; i++) {
    for (let tar = 1; tar < totalSum; tar++) {
      const notTake = prev[tar];
      const take = tar >= arr[i] ? prev[tar - arr[i]] : false;
      cur[tar] = notTake || take;
    }
    prev = [...cur];
  }
  let minimum = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < totalSum / 2; i++) {
    if (prev[i]) {
      // here i is the target sum since dp[i][j] represent index & target dp
      minimum = Math.min(minimum, Math.abs(totalSum - i - i));
    }
  }
  return minimum;
}
