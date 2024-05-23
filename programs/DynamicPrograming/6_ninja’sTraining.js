/**
 * Ninja’s Training
 * https://www.naukri.com/code360/problems/ninja-s-training_3621003
 * Problem statement
 * Ninja is planing this ‘N’ days-long training schedule. Each day, he can perform any one of these three activities. (Running, Fighting Practice or Learning New Moves). Each activity has some merit points on each day. As Ninja has to improve all his skills, he can’t do the same activity in two consecutive days. Can you help Ninja find out the maximum merit points Ninja can earn?
 *
 * You are given a 2D array of size N*3 ‘POINTS’ with the points corresponding to each day and activity. Your task is to calculate the maximum number of merit points that Ninja can earn.
 *
 * For Example
 * If the given ‘POINTS’ array is [[1,2,5], [3 ,1 ,1] ,[3,3,3] ],the answer will be 11 as 5 + 3 + 3.
 *
 * Constraints:
 * 1 <= T <= 10
 * 1 <= N <= 100000.
 * 1 <= values of POINTS arrays <= 100 .
 *
 * Time limit: 1 sec
 * Sample Input 1:
 * 2
 * 3
 * 1 2 5
 * 3 1 1
 * 3 3 3
 * 3
 * 10 40 70
 * 20 50 80
 * 30 60 90
 * Sample Output 1:
 * 11
 * 210
 * Explanation of sample input 1:
 * For the first test case,
 * One of the answers can be:
 * On the first day, Ninja will learn new moves and earn 5 merit points.
 * On the second day, Ninja will do running and earn 3 merit points.
 * On the third day, Ninja will do fighting and earn 3 merit points.
 * The total merit point is 11 which is the maximum.
 * Hence, the answer is 11.
 *
 * For the second test case:
 * One of the answers can be:
 * On the first day, Ninja will learn new moves and earn 70 merit points.
 * On the second day, Ninja will do fighting and earn 50 merit points.
 * On the third day, Ninja will learn new moves and earn 90 merit points.
 * The total merit point is 210 which is the maximum.
 * Hence, the answer is 210.
 * Sample Input 2:
 * 2
 * 3
 * 18 11 19
 * 4 13 7
 * 1 8 13
 * 2
 * 10 50 1
 * 5 100 11
 * Sample Output 2:
 * 45
 * 110
 */
// **************************************************** Memoization ********************************************

function ninjaTrainingUsingMemoization(n, points) {
  const dp = Array.from({ length: n }, () => Array(4).fill(-1));

  function solve(day, last) {
    if (dp[day][last] != -1) return dp[day][last];
    if (day === 0) {
      let maxi = 0;
      for (let i = 0; i < 3; i++) {
        if (i != last) {
          maxi = Math.max(maxi, points[0][i]);
        }
      }
      return (dp[day][last] = maxi);
    }
    let maxi = 0;
    for (let i = 0; i < 3; i++) {
      if (i != last) {
        let activity = points[day][i] + solve(day - 1, i);
        maxi = Math.max(maxi, activity);
      }
    }
    return (dp[day][last] = maxi);
  }
  return solve(n - 1, 3);
}
// **************************************************** Tabulation ********************************************
function ninjaTrainingUsingMemoization(n, points) {
  const dp = Array.from({ length: n }, () => Array(4).fill(0));
  dp[0][0] = Math.max(points[0][1], points[0][2]);
  dp[0][1] = Math.max(points[0][0], points[0][2]);
  dp[0][2] = Math.max(points[0][0], points[0][1]);
  dp[0][3] = Math.max(points[0][0], points[0][1], points[0][2]);
  for (let day = 0; day < n; day++) {
    for (let last = 0; last < 4; last++) {
      dp[day][last] = 0;
      for (let task = 0; task < 3; task++) {
        if (task != last) {
          let activity = points[day][task] + dp[day - 1][task];
          dp[day][last] = Math.max(dp[day][last], activity);
        }
      }
    }
  }
  return dp[n - 1][3];
}

// **************************************************** Space Optimization ********************************************

function ninjaTrainingUsingMemoization(n, points) {
  const prev = [];
  prev[0] = Math.max(points[0][1], points[0][2]);
  prev[1] = Math.max(points[0][0], points[0][2]);
  prev[2] = Math.max(points[0][0], points[0][1]);
  prev[3] = Math.max(points[0][0], points[0][1], points[0][2]);

  for (let day = 0; day < n; day++) {
    for (let last = 0; last < 4; last++) {
      let temp = [];
      for (let task = 0; task < 3; task++) {
        if (task != last) {
          temp[task] = Math.max(temp[task], points[day][task] + prev[task]);
        }
      }
    }
    prev = [...temp];
  }
  return prev[3];
}
let points = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];

// Get the number of days
let n = points.length;

// Call the 'ninjaTraining' function and print the result
console.log(ninjaTraining(n, points));
