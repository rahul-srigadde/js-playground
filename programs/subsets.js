var subsets = function (nums) {
  var res = [],
    temp = [];

  function findsubset(i) {
    if (i >= nums.length) {
      res.push([...temp]);
      return;
    }

    temp.push(nums[i]);
    console.log("line 12----", i + 1);
    findsubset(i + 1);

    temp.pop();
    console.log("line 16----", i + 1);
    findsubset(i + 1);
  }
  findsubset(0);
  return res;
};

subsets([1, 2, 2]);
