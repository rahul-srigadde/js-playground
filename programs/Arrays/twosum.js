function twosum(arr, target) {
  const obj = {};
  const res = [];
  for (let ele of arr) {
    const key = target - ele;
    if (obj[ele] && obj[ele] != 0) {
      res.push([ele, key]);
      obj[ele] = obj[ele] ? obj[ele] - 1 : delete obj[ele];
    } else {
      obj[key] = obj[key] ? obj[key] + 1 : 1;
    }
  }
  return res;
}

function twosum(arr, target) {
  const obj = {};
  const res = [];
  for (let key of arr) {
    const ele = target - key;
    if (obj[ele] && obj[ele] > 0) {
      res.push([key, ele]);
      obj[key] = obj[key] ? obj[key] - 1 : delete obj[key];
    } else {
      obj[key] = obj[key] ? obj[key] + 1 : 1;
    }
  }
}
