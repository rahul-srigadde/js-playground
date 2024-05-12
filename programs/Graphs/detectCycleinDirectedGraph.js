var detectCycleinDirectedGraph = function (graph) {
  let rows = graph.length;
  let visited = Array(rows).fill(0);
  let pathVisited = Array(rows).fill(0);

  function dfs(node, pathVisited) {
    visited[node] = 1;
    pathVisited[node] = 1;
    for (const edge of graph[node]) {
      if (!visited[edge]) {
        const res = dfs(node, pathVisited);
        if (res) {
          return true;
        }
      } else if (pathVisited[edge]) return true;
    }
    pathVisited[edge] = 0;
    return false;
  }

  for (let i = 0; i < rows; i++) {
    if (!visited[i]) {
      if (dfs(i, pathVisited)) return true;
    }
  }
  return false;
};
