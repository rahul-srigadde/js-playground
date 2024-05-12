var permute = function (nums) {
  var resuts = [],
    temp = [];
  var used = new Array(nums.length).fill(false);

  function dfs() {
    if (temp.length === nums.length) {
      resuts.push([...temp]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        temp.push(nums[i]);
        dfs();
        used[i] = false;
        temp.pop();
      }
    }
  }
  dfs();
  return resuts;
};

var res = permute([1, 2, 3]);

console.log(res);
