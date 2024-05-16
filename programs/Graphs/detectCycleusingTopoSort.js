/**
 * https://www.geeksforgeeks.org/detect-cycle-in-directed-graph-using-topological-sort/
 * Given a Directed Graph consisting of N vertices and M edges and a set of Edges[][],
 * the task is to check whether the graph contains a cycle or not using Topological sort.
 * Approach:
 * In Topological Sort, the idea is to visit the parent node followed by the child node.
 * If the given graph contains a cycle, then there is at least one node which is a parent as well as a child so this will break Topological Order.
 * Therefore, after the topological sort,
 * check for every directed edge whether it follows the order or not.
 */
var detectCycleusingTopoSort = function (v, adjls) {
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

  return !(result.length === v);
};
