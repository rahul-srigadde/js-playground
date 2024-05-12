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
function detectCycleByBFS(vertices, adjlist) {
  let visited = Array(vertices).fill(false);
  function checkForCycle(src) {
    let queue = [[src, -1]];
    visited[src] = true;
    while (queue.length) {
      let [vertex, parent] = queue.shift();
      for (const it of adjlist[vertex]) {
        if (!visited[it]) {
          visited[it] = true;
          queue.push([it, vertex]);
        } else if (parent != it) {
          return true;
        }
      }
    }
    return false;
  }
  for (i = 0; i < V; i++)
    if (vis[i] == false) if (checkForCycle(i)) return true;

  return false;
}
