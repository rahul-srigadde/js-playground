/**
 * Frog Jump
 * https://www.naukri.com/code360/problems/frog-jump_3621012
 * Problem statement
 * There is a frog on the '1st' step of an 'N' stairs long staircase.
 * The frog wants to reach the 'Nth' stair. 'HEIGHT[i]' is the height of the '(i+1)th' stair.
 * If Frog jumps from 'ith' to 'jth' stair, the energy lost in the jump is given by absolute value of ( HEIGHT[i-1] - HEIGHT[j-1] ).
 * If the Frog is on 'ith' staircase, he can jump either to '(i+1)th' stair or to '(i+2)th' stair.
 * Your task is to find the minimum total energy used by the frog to reach from '1st' stair to 'Nth' stair.
 *
 * For Example
 * If the given ‘HEIGHT’ array is [10,20,30,10],
 * the answer 20 as the frog can jump from 1st stair to 2nd stair (|20-10| = 10 energy lost) and
 * then a jump from 2nd stair to last stair (|10-20| = 10 energy lost). So, the total energy lost is 20.
 *
 * Constraints:
 * 1 <= T <= 10
 * 1 <= N <= 100000.
 * 1 <= HEIGHTS[i] <= 1000 .
 *
 * Time limit: 1 sec
 * Sample Input 1:
 * 2
 * 4
 * 10 20 30 10
 * 3
 * 10 50 10
 * Sample Output 1:
 * 20
 * 0
 * Explanation of sample input 1:
 * For the first test case,
 * The frog can jump from 1st stair to 2nd stair (|20-10| = 10 energy lost).
 * Then a jump from the 2nd stair to the last stair (|10-20| = 10 energy lost).
 * So, the total energy lost is 20 which is the minimum.
 * Hence, the answer is 20.
 *
 * For the second test case:
 * The frog can jump from 1st stair to 3rd stair (|10-10| = 0 energy lost).
 * So, the total energy lost is 0 which is the minimum.
 * Hence, the answer is 0.
 * Sample Input 2:
 * 2
 * 8
 * 7 4 4 2 6 6 3 4
 * 6
 * 4 8 3 10 4 4
 * Sample Output 2:
 * 7
 * 2
 *
 *
 * Hints:
 * 1. Think about all the possibilities at each stair.
 * 2. Using recursion, try to divide the problem into subproblems and calculate the answer for each subproblem only once - store it for reusing in the future.
 * 3. The above can also be done iteratively.
 */

//*********************************** recursion **********************************
class Recursion {
  recurive(index, heights) {
    if (index == 0) return 0;
    const left =
      this.recurive(index - 1) + Math.abs(heights[index] - heights[index - 1]);

    const right =
      index > 1
        ? this.recurive(index - 2) +
          Math.abs(heights[index] - heights[index - 2])
        : Number.MAX_SAFE_INTEGER;
    return Math.min(left, right);
  }
  frogJump(heights) {
    return this.recurive(heights.length - 1, heights);
  }
}

//*********************************** memoization -dp **********************************

class Dp {
  dp(index, heights, dparr) {
    if (index == 0) return 0;
    if (dparr[index] != -1) return dparr[index];

    const jumpOne =
      this.dp(index - 1) + Math.abs(heights[index] - heights[index - 1]);

    const jumpTwo =
      index > 1
        ? this.dp(index - 2) + Math.abs(heights[index] - heights[index - 2])
        : Number.MAX_SAFE_INTEGER;
    return (dparr[index] = Math.min(jumpOne, jumpTwo));
  }
  frogJump(heights) {
    const dparr = new Array(heights.length).fill(-1);

    return this.dp(heights.length - 1, heights, dparr);
  }
}

//*********************************** Tabluation -dp **********************************

function frogJump(height) {
  const n = height.length;
  const dp = new Array(n).fill(-1);
  dp[0] = 0;

  for (let ind = 1; ind < n; ind++) {
    let jumpTwo = Infinity;
    let jumpOne = dp[ind - 1] + Math.abs(height[ind] - height[ind - 1]);
    if (ind > 1)
      jumpTwo = dp[ind - 2] + Math.abs(height[ind] - height[ind - 2]);

    dp[ind] = Math.min(jumpOne, jumpTwo);
  }

  return dp[n - 1];
}
//*********************************** space optimization -dp **********************************
function frogJump(height) {
  const n = height.length;
  // const dp = new Array(n).fill(-1);
  // dp[0] = 0;
  let prev2 = 0;
  let prev = 0;
  let curi;

  for (let ind = 1; ind < n; ind++) {
    jumpOne = prev + Math.abs(height[ind] - height[ind - 1]);
    if (ind > 1) jumpTwo = prev2 + Math.abs(height[ind] - height[ind - 2]);

    curi = Math.min(jumpOne, jumpTwo);
    prev2 = prev;
    prev = curi;
  }

  return prev;
}
