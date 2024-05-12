/*
https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1
Detect cycle in a directed graph

Given a Directed Graph with V vertices (Numbered from 0 to V-1) and E edges, check whether it contains any cycle or not.


Example 1:

Input:



Output: 1
Explanation: 3 -> 3 is a cycle

Example 2:

Input:


Output: 0
Explanation: no cycle in the graph

Your task:
You dont need to read input or print anything. Your task is to complete the function isCyclic() which takes the integer V denoting the number of vertices and adjacency list adj as input parameters and returns a boolean value denoting if the given directed graph contains a cycle or not.
In the adjacency list adj, element adj[i][j] represents an edge from i to j.


Expected Time Complexity: O(V + E)
Expected Auxiliary Space: O(V)


Constraints:
1 ≤ V, E ≤ 105


 */
var detectCycleinDirectedGraph = function (graph) {
  let rows = graph.length;
  let visited = Array(rows).fill(0);
  let pathVisited = Array(rows).fill(0);

  function dfs(node, pathVisited) {
    visited[node] = 1;
    pathVisited[node] = 1;
    for (const edge of graph[node]) {
      if (!visited[edge]) {
        const res = dfs(node, pathVisited);
        if (res) {
          return true;
        }
      } else if (pathVisited[edge]) return true;
    }
    pathVisited[node] = 0;
    return false;
  }

  for (let i = 0; i < rows; i++) {
    if (!visited[i]) {
      if (dfs(i, pathVisited)) return true;
    }
  }
  return false;
};
