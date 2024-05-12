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
