function flatten(obj) {
  let res = {};
  const keys = Object.keys(obj);
  for (let key of keys) {
    if (Array.isArray(obj[key])) {
      for (let i = 0; i < obj[key].length; i++) {
        res[key + "." + i] = obj[key][i];
      }
    } else if (typeof obj[key] === "object") {
      const temp = flatten(obj[key]);
      for (let j of temp) res[key + "." + j] = temp[j];
    } else {
      res[key] = obj[key];
    }
  }
  return res;
}
function flattenObject(obj, prefix = "") {
  let flatObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        let nestedObj = flattenObject(obj[key], prefix + key + ".");
        flatObj = { ...flatObj, ...nestedObj };
      } else {
        flatObj[prefix + key] = obj[key];
      }
    }
  }
  return flatObj;
}

const obj1 = {
  a: "a",
  b: "b",
  c: [1, 2, 2],
};

console.log(flatten(obj1));
