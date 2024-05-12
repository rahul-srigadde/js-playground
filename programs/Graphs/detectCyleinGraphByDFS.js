var detectCycleinGraphByDFS = function (vertices, adjList) {
  const visited = Array(vertices.length).fill(false);

  function dfs(node, parent) {
    visited[node] = true;
    adjList[node].forEach((element) => {
      if (!visited[element]) {
        const res = dfs(element, node);
        if (res) return true;
      } else if (element == parent) return true;
    });
    return false;
  }
  for (const vertex of vertices) {
    if (!visited[vertex]) if (dfs(vertex, -1)) return true;
  }
  return false;
};
