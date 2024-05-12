/**
 https://leetcode.com/problems/number-of-provinces/description/
  Number of Provinces
  There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

 

Example 1:


Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Example 2:


Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
 

Constraints:

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] is 1 or 0.
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]
 */
var findCircleNum = function (isConnected) {
  let res = 0;
  let cities = isConnected.length,
    visited = {};

  function dfs(city) {
    visited[city] = true;
    for (let i = 0; i < cities; i++) {
      if (!visited[i] && isConnected[city][i] == 1) {
        dfs(i);
      }
    }
  }
  for (let i = 0; i < cities; i++) {
    if (!visited[i]) {
      dfs(i);
      res++;
    }
  }

  return res;
};

var findCircleNum = function (M) {
  class UnionFind {
    constructor(n) {
      this.graph = [...Array(n)].map((_, i) => i);
      this.groups = n;
    }

    find(id) {
      if (this.graph[id] === id) return id;
      this.graph[id] = this.find(this.graph[id]);
      return this.graph[id];
    }

    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) {
        this.graph[rootY] = rootX;
        this.groups--;
      }
    }
  }

  const N = M.length,
    unionfind = new UnionFind(N);

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (M[r][c]) unionfind.union(r, c);
    }
  }
  return unionfind.groups;
};
const arr = [
  [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
];

arr.forEach((x) => {
  const op = findCircleNum(x);
  console.log(`res`, op);
});
