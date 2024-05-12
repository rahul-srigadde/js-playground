var numDistinctIslands = function (grid) {
  let rows = grid.length,
    columns = grid[0].length;
  let distinctIslands = new Set();
  let islands = [];
  let visited = Array.from({ length: rows }, () => Array(columns).fill(0));
  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function dfs(r, c, rp, cp, islands) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= columns ||
      visited[r][c] === 1 ||
      grid[r][c] === 0
    )
      return;
    visited[r][c] = 1;
    islands.push([r - rp, c - cp]);
    direction.forEach(([dr, dc]) => {
      const row = r + dr;
      const col = c + dc;
      dfs(row, col, rp, cp, islands);
    });
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == 1 && visited[i][j] === 0) {
        islands = [];
        dfs(i, j, i, j, islands);
        distinctIslands.add(JSON.stringify(islands));
      }
    }
  }
  return distinctIslands.size;
};

const arr = [
  [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
  ],
  [
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
  ],
];

arr.forEach((x) => {
  const op = numDistinctIslands(x);

  console.log(op);
});
