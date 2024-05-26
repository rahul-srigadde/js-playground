/**
 * https://www.geeksforgeeks.org/topological-sorting/
 * Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u-v, vertex u comes before v in the ordering.

    Note: Topological Sorting for a graph is not possible if the graph is not a DAG.

 */

var topologicalSort = function (v, adjls) {
  let visited = Array(v).fill(0);
  let stack = [];
  function dfs(node) {
    visited[node] = 1;
    for (const edge of adjls[node]) {
      if (!visited[edge]) {
        dfs(edge);
      }
    }
    stack.push(node);
  }
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  return stack.reverse();
};

var topologicalSortbyBFS = function (v, adjls) {
  let indegree = Array(v).fill(0);
  let queue = [];
  const result = [];
  for (const edges of adjls) {
    for (const edge of edges) {
      indegree[edge]++;
    }
  }
  for (let i = 0; i < v; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  while (queue.length) {
    let node = queue.shift();
    result.push(node);
    for (const edge of adjls[node]) {
      indegree[edge]--;
      if (indegree[edge] === 0) queue.push(edge);
    }
  }

  return result;
};
