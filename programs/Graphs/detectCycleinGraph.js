function detectCycleByBFS(vertices, adjlist) {
  let visited = Array(vertices).fill(false);
  function checkForCycle(src) {
    let queue = [[src, -1]];
    visited[src] = true;
    while (queue.length) {
      let [vertex, parent] = queue.shift();
      for (const it of adjlist[vertex]) {
        if (!visited[it]) {
          visited[it] = true;
          queue.push([it, vertex]);
        } else if (parent != it) {
          return true;
        }
      }
    }
    return false;
  }
  for (i = 0; i < V; i++)
    if (vis[i] == false) if (checkForCycle(i)) return true;

  return false;
}
