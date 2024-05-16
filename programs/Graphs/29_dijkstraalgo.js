/**
 * https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
 * Implementing Dijkstra Algorithm
 * Given a weighted, undirected and connected graph of V vertices and an adjacency list adj where adj[i] is a list of lists containing two integers where the first integer of each list j denotes there is edge between i and j , second integers corresponds to the weight of that  edge . You are given the source vertex S and You to Find the shortest distance of all the vertex's from the source vertex S. You have to return a list of integers denoting shortest distance between each node and Source vertex S.

 * Note: The Graph doesn't contain any negative weight cycle.

 * 

 * Example 1:

 * Input:
 * V = 2
 * adj [] = {{{1, 9}}, {{0, 9}}}
 * S = 0
 * Output:
 * 0 9
 * Explanation:

 * The source vertex is 0. Hence, the shortest 
 * distance of node 0 is 0 and the shortest 
 * distance from node 1 is 9.
 * 

 * Example 2:

 * Input:
 * V = 3, E = 3
 * adj = {{{1, 1}, {2, 6}}, {{2, 3}, {0, 1}}, {{1, 3}, {0, 6}}}
 * S = 2
 * Output:
 * 4 3 0
 * Explanation:

 * For nodes 2 to 0, we can follow the path-
 * 2-1-0. This has a distance of 1+3 = 4,
 * whereas the path 2-0 has a distance of 6. So,
 * the Shortest path from 2 to 0 is 4.
 * The shortest distance from 0 to 1 is 1 .
 * 

 * Your Task:
 * You don't need to read input or print anything. Your task is to complete the function dijkstra()  which takes the number of vertices V and an adjacency list adj as input parameters and Source vertex S returns a list of integers, where ith integer denotes the shortest distance of the ith node from the Source node. Here adj[i] contains a list of lists containing two integers where the first integer j denotes that there is an edge between i and j and the second integer w denotes that the weight between edge i and j is w.

 * 

 * Expected Time Complexity: O(V2).
 * Expected Auxiliary Space: O(V2).

 * 

 * Constraints:
 * 1 ≤ V ≤ 1000
 * 0 ≤ adj[i][j] ≤ 1000
 * 1 ≤ adj.size() ≤ [ (V*(V - 1)) / 2 ]
 * 0 ≤ S < V
 */
class Solution {
  // Function to find the shortest distance of all the vertices
  // from the source vertex S.
  dijkstra(V, adj, S) {
    // Create a priority queue for storing the nodes as a pair {dist,node}
    // where dist is the distance from source to the node.
    let pq = new PriorityQueue((a, b) => a[0] - b[0]);

    // Initialising distTo list with a large number to
    // indicate the nodes are unvisited initially.
    // This list contains distance from source to the nodes.
    let distTo = new Array(V).fill(Number.MAX_SAFE_INTEGER);

    // Source initialised with dist=0.
    distTo[S] = 0;
    pq.enqueue([0, S]);

    // Now, pop the minimum distance node first from the min-heap
    // and traverse for all its adjacent nodes.
    while (!pq.isEmpty()) {
      let [dis, node] = pq.dequeue();

      // Check for all adjacent nodes of the popped out
      // element whether the prev dist is larger than current or not.
      for (let [v, w] of adj[node]) {
        if (dis + w < distTo[v]) {
          distTo[v] = dis + w;

          // If current distance is smaller,
          // push it into the queue.
          pq.enqueue([dis + w, v]);
        }
      }
    }
    // Return the list containing shortest distances
    // from source to all the nodes.
    return distTo;
  }
}

// Priority Queue implementation
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
