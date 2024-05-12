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
