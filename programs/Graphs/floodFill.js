var floodFill = function (image, sr, sc, color) {
  const newImage = image.map((r) => [...r]);
  const prev = image[sr][sc];
  function dfs(row, col) {
    if (
      row < 0 ||
      row >= image.length ||
      col < 0 ||
      col >= image[0].length ||
      image[row][col] == "X" ||
      image[row][col] != prev
    ) {
      return;
    } else {
      const dir = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      image[row][col] = "X";
      newImage[row][col] = color;
      dir.forEach(([r, c]) => dfs(row + r, col + c));
    }
  }
  dfs(sr, sc);
  return newImage;
};
const op = floodFill(
  [
    [0, 0, 0],
    [0, 0, 0],
  ],
  1,
  0,
  2
);

console.log(op);
