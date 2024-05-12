var solve = function (board) {
  let rows = board.length,
    columns = board[0].length,
    visited = Array.from({ length: rows }, () => Array(columns).fill(0)),
    direction = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

  function dfs(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= columns ||
      visited[r][c] === 1 ||
      board[r][c] === "X"
    )
      return;

    visited[r][c] = 1;
    direction.forEach(([dr, dc]) => {
      const row = r + dr;
      const col = c + dc;
      dfs(row, col);
    });
  }
  for (let c = 0; c < columns; c++) {
    if (board[0][c] == "O") {
      dfs(0, c);
    }
  }
  for (let r = 0; r < rows; r++) {
    if (board[r][0] == "O") {
      dfs(r, 0);
    }
  }
  for (let c = 0; c < columns; c++) {
    if (board[rows - 1][c] == "O") {
      dfs(rows - 1, c);
    }
  }
  for (let r = 0; r < rows; r++) {
    if (board[r][columns - 1] == "O") {
      dfs(r, columns - 1);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] === "O" && visited[i][j] == 0) {
        board[i][j] = "X";
      }
    }
  }
};

const board = [
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"],
];
var surroundedRegions = solve;
surroundedRegions(board);

console.log(board);
