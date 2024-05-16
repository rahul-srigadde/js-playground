/**
 * https://www.geeksforgeeks.org/problems/shortest-path-in-a-binary-maze-1655453161/1
 * Shortest Distance in a Binary Maze
 * Given a n * m matrix grid where each element can either be 0 or 1. You need to find the shortest distance between a given source cell to a destination cell. The path can only be created out of a cell if its value is 1. 

 * If the path is not possible between source cell and destination cell, then return -1.

 * Note : You can move into an adjacent cell if that adjacent cell is filled with element 1. Two cells are adjacent if they share a side. In other words, you can move in one of the four directions, Up, Down, Left and Right. The source and destination cell are based on the zero based indexing. The destination cell should be 1.

 * Example 1:

 * Input:
 * grid[][] = {{1, 1, 1, 1},
 *  {1, 1, 0, 1},
 *  {1, 1, 1, 1},
 *  {1, 1, 0, 0},
 *  {1, 0, 0, 1}}
 * source = {0, 1}
 * destination = {2, 2}
 * Output:
 * 3
 * Explanation:
 * 1 1 1 1
 * 1 1 0 1
 * 1 1 1 1
 * 1 1 0 0
 * 1 0 0 1
 * The highlighted part in the matrix denotes the 
 * shortest path from source to destination cell.
 * Example 2:

 * Input:
 * grid[][] = {{1, 1, 1, 1, 1},
 *  {1, 1, 1, 1, 1},
 *  {1, 1, 1, 1, 0},
 *  {1, 0, 1, 0, 1}}
 * source = {0, 0}
 * destination = {3, 4}
 * Output:
 * -1
 * Explanation:
 * The path is not possible between source and 
 * destination, hence return -1.
 * Your Task:

 * You don't need to read or print anything. Your task is to complete the function shortestPath() which takes the a 2D integer array grid, source cell and destination cell as an input parameters and returns the shortest distance between source and destination cell.

 * Expected Time Complexity: O(n * m)
 * Expected Space Complexity: O(n * m)

 * Constraints:

 * 1 ≤ n, m ≤ 500
 * grid[i][j] == 0 or grid[i][j] == 1
 * The source and destination cells are always inside the given matrix.

 */
/**
 * @param {number[][]} grid
 * @param {number[]} source
 * @param {number[]} destination
 * @return {number}
 */

class Solution {
  shortestPath(grid, source, destination) {
    if (source[0] === destination[0] && source[1] === destination[1]) {
      return 0;
    }

    let rows = grid.length;
    let columns = grid[0].length;
    let directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    let distance = Array.from({ length: rows }, () =>
      Array(columns).fill(Number.POSITIVE_INFINITY)
    );

    // let pq = new PriorityQueue((a, b) => a[0] - b[0]);
    let pq = [];

    distance[source[0]][source[1]] = 0;
    pq.push([0, source]);
    while (pq.length) {
      let [dis, node] = pq.shift();
      for (let [dr, dc] of directions) {
        let r = dr + node[0];
        let c = dc + node[1];
        if (
          r >= 0 &&
          r < rows &&
          c >= 0 &&
          c < columns &&
          grid[r][c] === 1 &&
          1 + dis < distance[r][c]
        ) {
          distance[r][c] = 1 + dis;
          if (r === destination[0] && c === destination[1]) {
            return 1 + dis;
          }
          pq.push([1 + dis, [r, c]]);
        }
      }
    }
    return -1;
  }
}

const grid = [
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 0, 1],
];
let obj = new Solution();
const ans = obj.shortestPath(grid, [0, 1], [2, 2]);
console.log(ans);
