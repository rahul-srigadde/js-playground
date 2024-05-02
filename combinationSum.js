var combinationSum = function (candidates, target) {
  var resuts = [],
    temp = [];

  function findSumTarget(i, total) {
    if (total === target) {
      resuts.push([...temp]);
      return;
    }
    if (i >= candidates.length || total > target) return;

    temp.push(candidates[i]);
    findSumTarget(i, total + candidates[i]);

    temp.pop();
    findSumTarget(i + 1, total);
  }
  findSumTarget(0, 0);
  return resuts;
};
var res = combinationSum([2, 3, 6, 7], 7);
console.log(res);
