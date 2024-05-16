/**
 * https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1
 * https://takeuforward.org/data-structure/g-35-print-shortest-path-dijkstras-algorithm/
 * Shortest Path in Weighted undirected graph
 * You are given a weighted undirected graph having n vertices numbered from 1 to n and m edges describing there are edges between a to b with some weight, find the shortest path between the vertex 1 and the vertex n and if path does not exist then return a list consisting of only -1.

 * Note - 
 * 1. If there exists a path, then return a list whose first element is the weight of the path.
 * 2. If no path exists then return a list containing a single element -1.

 * Example:
 * Input:
 * n = 5, m= 6
 * edges = [[1,2,2], [2,5,5], [2,3,4], [1,4,1],[4,3,3],[3,5,1]]
 * Output:
 * 5 1 4 3 5
 * Explaination:
 * Shortest path from 1 to n is by the path 1 4 3 5 whose weight is 5. 

 * Your Task:
 * You don't need to read input or print anything. Your task is to complete the function shortestPath() which takes n vertex and m edges and vector of edges having weight as inputs and returns the shortest path between vertex 1 to n.

 * Expected Time Complexity: O(m* log(n))
 * Expected Space Complexity: O(n)

 * Constraint:
 * 2 <= n <= 105
 * 0 <= m <= 105
 * 0<= a, b <= n
 * 1 <= w <= 105
 */
class Solution {
  shortestPath(n, m, edges) {
    // Create an adjacency list of pairs of the form node1 -> {node2, edge weight}
    // where the edge weight is the weight of the edge from node1 to node2.
    let adj = Array.from({ length: n + 1 }, () => []);
    for (let edge of edges) {
      adj[edge[0]].push([edge[1], edge[2]]);
      adj[edge[1]].push([edge[0], edge[2]]);
    }

    // Create a priority queue for storing the nodes along with distances
    // in the form of a pair { dist, node }.
    let pq = new PriorityQueue((a, b) => a[0] - b[0]);

    // Create a dist array for storing the updated distances and a parent array
    // for storing the nodes from where the current nodes represented by indices of
    // the parent array came from.
    let dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    let parent = Array(n + 1)
      .fill(0)
      .map((_, i) => i);

    dist[1] = 0;

    // Push the source node to the queue.
    pq.enqueue([0, 1]);
    while (!pq.isEmpty()) {
      // Topmost element of the priority queue is with minimum distance value.
      let [dis, node] = pq.dequeue();

      // Iterate through the adjacent nodes of the current popped node.
      for (let [adjNode, edW] of adj[node]) {
        // Check if the previously stored distance value is
        // greater than the current computed value or not,
        // if yes then update the distance value.
        if (dis + edW < dist[adjNode]) {
          dist[adjNode] = dis + edW;
          pq.enqueue([dis + edW, adjNode]);

          // Update the parent of the adjNode to the recent
          // node where it came from.
          parent[adjNode] = node;
        }
      }
    }

    // If distance to a node could not be found, return an array containing -1.
    if (dist[n] === Number.MAX_SAFE_INTEGER) {
      return [-1];
    }

    // Store the final path in the 'path' array.
    let path = [];
    let node = n;

    // Iterate backwards from destination to source through the parent array.
    while (parent[node] !== node) {
      path.push(node);
      node = parent[node];
    }
    path.push(1);

    // Since the path stored is in a reverse order, we reverse the array
    // to get the final answer and then return the array.
    return path.reverse();
  }
}

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  dequeue() {
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    const parent = Math.floor((index - 1) / 2);

    while (
      parent >= 0 &&
      this.comparator(this.heap[parent], this.heap[index]) > 0
    ) {
      this.swap(parent, index);
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  heapifyDown() {
    let index = 0;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const size = this.heap.length;

    while (left < size) {
      let smallest = left;
      if (
        right < size &&
        this.comparator(this.heap[right], this.heap[left]) < 0
      ) {
        smallest = right;
      }
      if (this.comparator(this.heap[index], this.heap[smallest]) <= 0) {
        break;
      }
      this.swap(index, smallest);
      index = smallest;
      left = 2 * index + 1;
      right = 2 * index + 2;
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
