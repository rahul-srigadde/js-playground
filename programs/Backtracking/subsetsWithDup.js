var subsetsWithDup = function (nums) {
  var res = [],
    temp = [];
  var obj = {};
  nums.sort();
  function findsubset(i) {
    if (i >= nums.length) {
      res.push([...temp]);
      return;
    }

    temp.push(nums[i]);
    findsubset(i + 1);

    temp.pop();
    while (i + 1 < nums.length && nums[i] == nums[i + 1]) i += 1;
    findsubset(i + 1);
  }
  findsubset(0);
  return res;
};

var res = subsetsWithDup([1, 2, 2]);
console.log(res);
