/**
 * Trapping Rain Water
 *
 * https://leetcode.com/problems/trapping-rain-water/description/
 *
 * Given n non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 *
 * Example 1:
 *
 * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
 * In this case, 6 units of rain water (blue section) are being trapped.
 * Example 2:
 *
 * Input: height = [4,2,0,3,2,5]
 * Output: 9
 *
 */

function trap(height) {
  let i = 0,
    j = height.length - 1;
  let maxleft = height[i],
    maxright = height[j],
    sum = 0;

  while (i < j) {
    if (maxleft <= maxright) {
      i++;
      maxleft = Math.max(maxleft, height[i]);
      sum += maxleft - height[i];
    } else {
      j--;
      maxright = Math.max(maxright, height[j]);
      sum += maxright - height[j];
    }
  }
  return sum;
}
function trap(height) {
  let maxleft = [],
    maxright = [],
    sum = 0,
    hold;

  for (let i = 0; i < height.length; i++) {
    let j = height.length - i - 1;
    maxleft[i] = Math.max(
      i > 0 ? maxleft[i - 1] : 0,
      i > 0 ? height[i - 1] : 0
    );
    maxright[j] = Math.max(
      j < height.length - 1 ? maxright[j + 1] : 0,
      j < height.length - 1 ? height[j + 1] : 0
    );
  }

  for (let i = 0; i < height.length; i++) {
    hold = Math.min(maxleft[i], maxright[i]) - height[i];
    sum = sum + (hold > 0 ? hold : 0);
  }
  return sum;
}
