// ********************* DFS **********************************
var wallsAndGates = function (rooms) {
  if (!rooms) return;

  let rows = rooms.length,
    colums = rooms[0].length,
    visited = Array.from({ length: rows }, () => Array(colums).fill(false));

  function dfs(r, c, distance) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= colums ||
      visited[r][c] ||
      rooms[r][c] <= 0
    )
      return;

    visited[i][j] = true;
    rooms[i][j] = Math.min(rooms[i][j], distance);

    dfs(i - 1, j, distance + 1);
    dfs(i + 1, j, distance + 1);
    dfs(i, j - 1, distance + 1);
    dfs(i, j + 1, distance + 1);

    visited[i][j] = false;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      if (rooms[i][j] == 0) dfs(i, j, 0);
    }
  }
};

// ********************* DFS **********************************
