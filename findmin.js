var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let min = nums[0];

  while (left <= right) {
    if (nums[left] > nums[right]) {
      min = nums[right];
      right--;
    } else {
      min = nums[left];
      left++;
    }
  }
  return min;
};
// console.log(findMin([3, 4, 5, 1, 2]));

const root = [3, 9, 20, 15, 7];
const mid = 1;
console.log(root.slice(1, mid + 1));
console.log(root.slice(0, mid));
console.log(root.slice(mid + 1));
console.log(root.slice(mid + 1));
