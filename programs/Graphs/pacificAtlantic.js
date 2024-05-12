var pacificAtlantic = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const pac = new Map();
  const atl = new Map();
  function formKey(r, c) {
    return `row-${r}-col-${c}`;
  }
  function dfs(r, c, visit, prevHeight) {
    const key = formKey(r, c);
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      visit.has(key) ||
      heights[r][c] < prevHeight
    )
      return;

    visit.set(key, true);
    dfs(r - 1, c, visit, heights[r][c]);
    dfs(r + 1, c, visit, heights[r][c]);
    dfs(r, c - 1, visit, heights[r][c]);
    dfs(r, c + 1, visit, heights[r][c]);
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows - 1, c, atl, heights[rows - 1][c]);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols - 1, atl, heights[r][cols - 1]);
  }
  let result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = formKey(r, c);
      if (pac.has(key) && atl.has(key)) {
        result.push([r, c]);
      }
    }
  }
  return result;
};

const op = pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);

console.log(op);
