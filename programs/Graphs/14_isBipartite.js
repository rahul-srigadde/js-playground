/**
https://leetcode.com/problems/is-graph-bipartite/description/

Is Graph Bipartite?

There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. 
You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. 
More formally, for each v in graph[u], there is an undirected edge between node u and node v. 
The graph has the following properties:

There are no self-edges (graph[u] does not contain u).
There are no parallel edges (graph[u] does not contain duplicate values).
If v is in graph[u], then u is in graph[v] (the graph is undirected).
The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that 
every edge in the graph connects a node in set A and a node in set B.

Return true if and only if it is bipartite.

Example 1:

Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets such that 
every edge connects a node in one and a node in the other.

Example 2:

Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
 

Constraints:

graph.length == n
1 <= n <= 100
0 <= graph[u].length < n
0 <= graph[u][i] <= n - 1
graph[u] does not contain u.
All the values of graph[u] are unique.
If graph[u] contains v, then graph[v] contains u.
 */
var isBipartiteBybfs = function (graph) {
  let rows = graph.length;
  let visited = Array(rows).fill(-1);

  function bfs(i) {
    let queue = [i];
    visited[i] = 0;
    while (queue.length) {
      let node = queue.shift();
      for (const edge of graph[node]) {
        if (visited[edge] != -1 && visited[edge] === visited[node]) {
          return false;
        } else if (visited[edge] === -1) {
          visited[edge] = !visited[node];
          queue.push(edge);
        }
      }
    }
    return true;
  }

  for (let i = 0; i < rows; i++) {
    if (visited[i] === -1) {
      if (!bfs(i)) return false;
    }
  }
  return true;
};

var isBipartite = function (graph) {
  let rows = graph.length;
  let color = Array(rows).fill(-1);

  function dfs(node, col) {
    color[node] = col;
    for (const edge of graph[node]) {
      if (color[edge] === -1) {
        if (!dfs(edge, !col)) return false;
      } else if (color[edge] === col) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < rows; i++) {
    if (color[i] === -1) {
      if (dfs(i, true) === false) return false;
    }
  }
  return true;
};
const arr = [
  //   [
  //     [],
  //     [2, 4, 6],
  //     [1, 4, 8, 9],
  //     [7, 8],
  //     [1, 2, 8, 9],
  //     [6, 9],
  //     [1, 5, 7, 8, 9],
  //     [3, 6, 9],
  //     [2, 3, 4, 6, 9],
  //     [2, 4, 5, 6, 7, 8],
  //   ],
  [
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ],
  //   [
  //     [1, 3],
  //     [0, 2],
  //     [1, 3],
  //     [0, 2],
  //   ],
];

arr.forEach((x) => {
  const op = isBipartiteBybfs(x);
  const op1 = isBipartite(x);

  console.log(op === op1);
});
