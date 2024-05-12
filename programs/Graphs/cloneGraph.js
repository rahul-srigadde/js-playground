class Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}
var cloneGraph = function (node) {
  if (node == null) {
    return null;
  }
  let visited = new Map();
  function dfs(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }
    let clone = new Node(node.val);
    visited.set(node, clone);
    for (let neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }
  return dfs(node);
};
