/**
 * https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1
 * Shortest path in Undirected Graph
 * You are given an Undirected Graph having unit weight of the edges, 
 * find the shortest path from src to all the vertex and if it is unreachable to reach any vertex, 
 * then return -1 for that vertex.

 * Example1:

 * Input:
 * n = 9, m= 10
 * edges=[[0,1],[0,3],[3,4],[4,5],[5,6],[1,2],[2,6],[6,7],[7,8],[6,8]] 
 * src=0
 * Output:
 * 0 1 2 1 2 3 3 4 4
 * Explanation:
 * Example2:

 * Input:
 * n = 4, m= 4
 * edges=[[0,0],[1,1],[1,3],[3,0]] 
 * src=3
 * Output:
 * 1 1 -1 0
 * Explanation:
 * Your Task:
 * You don't need to print or input anything. 
 * Complete the function shortest path() which takes a 2d vector or array of edges representing the edges of an undirected graph with unit weight, 
 * an integer n as the number of nodes, an integer m as a number of edges and an integer src as the input parameters and 
 * returns an integer array or vector, denoting the vector of distance from src to all nodes.

 * Constraint:
 * 1<=n,m<=10000
 * 0<=edges[i][j]<=n-1

 * Expected Time Complexity: O(N + E), where N is the number of nodes and E is the edges
 * Expected Space Complexity: O(N)
 */

class Solution {
  shortestPath(edges, N, M, src) {
    // Create an adjacency list of size N for storing the undirected graph.
    const adj = new Array(N).fill(0).map(() => []);
    for (const [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    // A dist array of size N initialised with a large number to
    // indicate that initially all the nodes are untraversed.
    const dist = new Array(N).fill(Number.POSITIVE_INFINITY);
    dist[src] = 0;
    const queue = [src];
    while (queue.length > 0) {
      const node = queue.shift();
      for (const neighbor of adj[node]) {
        if (dist[node] + 1 < dist[neighbor]) {
          dist[neighbor] = dist[node] + 1;
          queue.push(neighbor);
        }
      }
    }

    // Updated shortest distances are stored in the resultant array 'ans'.
    // Unreachable nodes are marked as -1.
    const ans = new Array(N).fill(-1);
    for (let i = 0; i < N; i++) {
      if (dist[i] !== Number.POSITIVE_INFINITY) {
        ans[i] = dist[i];
      }
    }
    return ans;
  }
}

const N = 9,
  M = 10;
const edges = [
  [0, 1],
  [0, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [1, 2],
  [2, 6],
  [6, 7],
  [7, 8],
  [6, 8],
];

const obj = new Solution();
const ans = obj.shortestPath(edges, N, M, 0);

console.log(ans.join(" "));
