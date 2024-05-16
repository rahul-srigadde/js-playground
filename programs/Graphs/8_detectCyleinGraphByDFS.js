/*
https://leetcode.com/discuss/interview-question/1408271/5-cycle-in-an-undirected-graph
Cycle in an Undirected Graph

Detection of a Cycle in an Undirected Graph.

2 Methods to solve this-

DFS
BFS
Let's done with DFS:

Algorithm:

For every visited vertex v, if there is an adjacent u such that u is already visited and u is not parent of v, then there is a cycle in graph.
If we don’t find such an adjacent for any vertex, we say that there is no cycle.
 */
var detectCycleinGraphByDFS = function (vertices, adjList) {
  const visited = Array(vertices.length).fill(false);

  function dfs(node, parent) {
    visited[node] = true;
    adjList[node].forEach((element) => {
      if (!visited[element]) {
        const res = dfs(element, node);
        if (res) return true;
      } else if (element == parent) return true;
    });
    return false;
  }
  for (const vertex of vertices) {
    if (!visited[vertex]) if (dfs(vertex, -1)) return true;
  }
  return false;
};
