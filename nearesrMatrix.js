var updateMatrix = function (mat) {
  let rows = mat.length,
    colums = mat[0].length,
    distance = Array.from({ length: rows }, () => Array(colums).fill(0)),
    visited = Array.from({ length: rows }, () => Array(colums).fill(0)),
    queue = [],
    direction = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      if (mat[i][j] == 0) {
        queue.push([i, j, 0]);
        visited[i][j] = 1;
      }
    }
  }

  while (queue.length) {
    const [r, c, d] = queue.shift();
    distance[r][c] = d;
    direction.forEach(([dr, dc]) => {
      const row = r + dr;
      const col = c + dc;
      if (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < colums &&
        visited[row][col] == 0
      ) {
        visited[row][col] = 1;
        queue.push([row, col, d + 1]);
      }
    });
  }
  return distance;
};

const arr = [
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
];
arr.forEach((x) => {
  const op = updateMatrix(x);

  console.log(op);
});
