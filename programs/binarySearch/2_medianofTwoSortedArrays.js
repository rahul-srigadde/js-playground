/**
 *  Median of Two Sorted Arrays
 *  https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 *  Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 *
 *
 * Example 1:
 *
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: merged array = [1,2,3] and median is 2.
 * Example 2:
 *
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 */

var findMedianSortedArrays = function (nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  const half = Math.floor((nums1.length + nums2.length + 1) / 2);
  let left = 0;
  let right = nums1.length;

  while (left <= right) {
    let mid1 = Math.floor((left + right) / 2);
    let mid2 = half - mid1;
    let l1 = mid1 > 0 ? nums1[mid1 - 1] : Number.MIN_SAFE_INTEGER;
    let l2 = mid2 > 0 ? nums2[mid2 - 1] : Number.MIN_SAFE_INTEGER;
    let r1 = mid1 < nums1.length ? nums1[mid1] : Number.MAX_SAFE_INTEGER;
    let r2 = mid2 < nums2.length ? nums2[mid2] : Number.MAX_SAFE_INTEGER;

    if (l1 <= r2 && l2 <= r1) {
      if ((nums1.length + nums2.length) % 2 == 1) {
        return Math.max(l1, l2);
      } else {
        return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
      }
    } else if (l1 > r2) right = mid1 - 1;
    else left = mid1 + 1;
  }
  return 0;
};

console.log(findMedianSortedArrays([1, 2], [3, 4]));
