/**
 * https://leetcode.com/problems/redundant-connection/description/
 * 
 * Redundant Connection
 * In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

 

Example 1:


Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
 

Constraints:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.
 */

// using class
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  findParent(node) {
    if (this.parent[node] != node) {
      this.parent[node] = this.findParent(this.parent[node]);
    }
    return this.parent[node];
  }
  union(x, y) {
    const rootX = this.findParent(x);
    const rootY = this.findParent(y);
    if (rootX == rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootY] < this.rank[rootX]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootX] = rootY;
      this.rank[rootY]++;
    }
    return true;
  }
}
var findRedundantConnection = function (edges) {
  const uf = new UnionFind(edges.length);
  for (const edge of edges) {
    if (!uf.union(edge[0] - 1, edge[1] - 1)) {
      return edge;
    }
  }
  return [];
};
//Zero based index
// var findRedundantConnection = function (edges) {
//   let parent = Array.from({ length: edges.length }, (_, i) => i);

//   let findParent = (x) =>
//     x === parent[x] ? x : (parent[x] = findParent(parent[x]));

//   let union = (x, y) => (parent[findParent(y)] = findParent(x));

//   for (let [a, b] of edges)
//     if (findParent(a - 1) === findParent(b - 1)) return [a, b];
//     else union(a - 1, b - 1);
// };

//1 based index
// var findRedundantConnection = function (edges) {
//   let parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
//   const findParent = (x) => (x === parent[x] ? parent[x] : (parent[x] = findParent(parent[x])));
//   const union = (x, y) => (parent[findParent(y)] = findParent(x));
//   for (let [a, b] of edges)
//     if (findParent(a) === findParent(b)) return [a, b];
//     else union(a, b);
// };

findRedundantConnection([
  [1, 2],
  [1, 3],
  [2, 3],
]);
