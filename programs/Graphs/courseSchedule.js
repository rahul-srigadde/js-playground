var canFinish = function (numCourses, prerequisites) {
  let visited = Array(numCourses).fill(0);
  let pathVisited = Array(numCourses).fill(0);
  let graph = new Array(numCourses).fill(0).map(() => []);

  for (let [course, pre] of prerequisites) {
    graph[course].push(pre);
  }
  function dfs(node, pathVisited) {
    visited[node] = 1;
    pathVisited[node] = 1;
    for (const edge of graph[node]) {
      if (!visited[edge]) {
        if (dfs(edge, pathVisited)) return true;
      } else if (pathVisited[edge]) return true;
    }
    pathVisited[node] = 0;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      if (dfs(i, pathVisited)) return false;
    }
  }
  return true;
};

const op1 = canFinish(2, [[1, 0]]);

console.log(op1);
