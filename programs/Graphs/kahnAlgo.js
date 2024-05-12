/**
 * 
 * https://www.geeksforgeeks.org/problems/topological-sort/1
 * Given a Directed Acyclic Graph (DAG) with V vertices and E edges, Find any Topological Sorting of that Graph.
 * Example 1:
 * Input:

 * Output:
 * 1
 * Explanation:
 * The output 1 denotes that the order is
 * valid. So, if you have, implemented
 * your function correctly, then output
 * would be 1 for all test cases.
 * One possible Topological order for the
 * graph is 3, 2, 1, 0.
 * Example 2:

 * Input:

 * Output:
 * 1
 * Explanation:
 * The output 1 denotes that the order is
 * valid. So, if you have, implemented
 * your function correctly, then output
 * would be 1 for all test cases.
 * One possible Topological order for the
 * graph is 5, 4, 2, 1, 3, 0.
 * Your Task:
 * You don't need to read input or print anything. Your task is to complete the function topoSort()  which takes the integer V denoting the number of vertices and adjacency list as input parameters and returns an array consisting of the vertices in Topological order. As there are multiple Topological orders possible, you may return any of them. If your returned topo sort is correct then the console output will be 1 else 0.

 * Expected Time Complexity: O(V + E).
 * Expected Auxiliary Space: O(V).

 * Constraints:
 * 2 ≤ V ≤ 104
 * 1 ≤ E ≤ (N*(N-1))/2
 */

var kahnAlgo = function (v, adjls) {
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
