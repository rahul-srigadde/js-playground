/**
 * https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1
 * Minimum Multiplications to reach End
 *
 * Given start, end and an array arr of n numbers. At each step, start is multiplied with any number in the array and then mod operation with 100000 is done to get the new start.
 *
 * Your task is to find the minimum steps in which end can be achieved starting from start. If it is not possible to reach end, then return -1.
 *
 * Example 1:
 *
 * Input:
 * arr[] = {2, 5, 7}
 * start = 3, end = 30
 * Output:
 * 2
 * Explanation:
 * Step 1: 3*2 = 6 % 100000 = 6
 * Step 2: 6*5 = 30 % 100000 = 30
 * Example 2:
 *
 * Input:
 * arr[] = {3, 4, 65}
 * start = 7, end = 66175
 * Output:
 * 4
 * Explanation:
 * Step 1: 7*3 = 21 % 100000 = 21
 * Step 2: 21*3 = 63 % 100000 = 63
 * Step 3: 63*65 = 4095 % 100000 = 4095
 * Step 4: 4095*65 = 266175 % 100000 = 66175
 * Your Task:
 * You don't need to print or input anything. Complete the function minimumMultiplications() which takes an integer array arr, an integer start and an integer end as the input parameters and returns an integer, denoting the minumum steps to reach in which end can be achieved starting from start.
 *
 * Expected Time Complexity: O(105)
 * Expected Space Complexity: O(105)
 *
 * Constraints:
 *
 * 1 <= n <= 104
 * 1 <= arr[i] <= 104
 * 1 <= start, end < 105
 */
class Solution {
  minimumMultiplications(arr, start, end) {
    // Create a queue for storing the numbers as a result of multiplication
    // of the numbers in the array and the start number.
    let q = [];
    q.push([start, 0]);

    // Create a dist array to store the no. of multiplications to reach
    // a particular number from the start number.
    let dist = new Array(100000).fill(Number.POSITIVE_INFINITY);
    dist[start] = 0;
    let mod = 100000;

    // Multiply the start no. with each of numbers in the arr
    // until we get the end no.
    while (q.length > 0) {
      let [node, steps] = q.shift();
      for (let it of arr) {
        let num = (it * node) % mod;

        // If the no. of multiplications are less than before
        // in order to reach a number, we update the dist array.
        if (steps + 1 < dist[num]) {
          dist[num] = steps + 1;

          // Whenever we reach the end number
          // return the calculated steps
          if (num === end) {
            return steps + 1;
          }
          q.push([num, steps + 1]);
        }
      }
    }
    // If the end no. is unattainable.
    return -1;
  }
}
