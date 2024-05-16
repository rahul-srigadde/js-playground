class Solution {
  MinimumEffort(heights) {
    // Create a priority queue containing pairs of cells
    // and their respective distance from the source cell in the
    // form {diff, {row of cell, col of cell}}.
    let pq = new PriorityQueue((a, b) => a[0] - b[0]);

    let n = heights.length;
    let m = heights[0].length;

    // Create a distance matrix with initially all the cells marked as
    // unvisited and the dist for source cell (0,0) as 0.
    let dist = Array.from({ length: n }, () => Array(m).fill(1e9));
    dist[0][0] = 0;
    pq.enqueue([0, [0, 0]]);

    // The following delta rows and delts columns array are created such that
    // each index represents each adjacent node that a cell may have
    // in a direction.
    let dr = [-1, 0, 1, 0];
    let dc = [0, 1, 0, -1];

    // Iterate through the matrix by popping the elements out of the queue
    // and pushing whenever a shorter distance to a cell is found.
    while (!pq.isEmpty()) {
      let [diff, [row, col]] = pq.dequeue();

      // Check if we have reached the destination cell,
      // return the current value of difference (which will be min).
      if (row === n - 1 && col === m - 1) return diff;

      for (let i = 0; i < 4; i++) {
        // row - 1, col
        // row, col + 1
        // row - 1, col
        // row, col - 1
        let newr = row + dr[i];
        let newc = col + dc[i];

        // Checking validity of the cell.
        if (newr >= 0 && newc >= 0 && newr < n && newc < m) {
          // Effort can be calculated as the max value of differences
          // between the heights of the node and its adjacent nodes.
          let newEffort = Math.max(
            Math.abs(heights[row][col] - heights[newr][newc]),
            diff
          );

          // If the calculated effort is less than the prev value
          // we update as we need the min effort.
          if (newEffort < dist[newr][newc]) {
            dist[newr][newc] = newEffort;
            pq.enqueue([newEffort, [newr, newc]]);
          }
        }
      }
    }
    return 0; // if unreachable
  }
}

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  enqueue(x) {
    this.heap.push(x);
    this.heapifyUp(this.heap.length - 1);
  }

  dequeue() {
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return top;
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (
      left < this.heap.length &&
      this.comparator(this.heap[left], this.heap[smallest]) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      this.comparator(this.heap[right], this.heap[smallest]) < 0
    ) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const heights = [
  [1, 2, 2],
  [3, 8, 2],
  [5, 3, 5],
];

let obj = new Solution();
const ans = obj.MinimumEffort(heights);
console.log(ans);
