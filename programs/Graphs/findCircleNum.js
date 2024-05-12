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
