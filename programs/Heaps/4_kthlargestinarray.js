/**
 *  Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * Can you solve it without sorting?
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 * Constraints:
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new MinHeap(k);
    nums.forEach((element) => {
      this.add(element);
    });
  }
  add(val) {
    if (this.heap.size() < this.k) {
      this.heap.add(val);
    } else if (this.heap.peek() < val) {
      this.heap.add(val);
      this.heap.extractMin();
    }
    return this.heap.peek();
  }
}

class MinHeap {
  constructor() {
    this.values = [];
  }
  size() {
    return this.values.length;
  }
  peek() {
    if (!this.values) return null;
    return this.values[0];
  }
  add(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parentElement = this.values[parentIdx];
      if (element >= parentElement) break;
      else {
        this.values[idx] = parentElement;
        this.values[parentIdx] = element;
        idx = parentIdx;
      }
    }
  }
  extractMin() {
    const min = this.values[0];
    const element = this.values.pop();
    if (this.values.length) {
      this.values[0] = element;
      this.bubbledown();
    }
  }
  bubbledown() {
    let idx = 0;
    let element = this.values[idx];
    let length = this.values.length;

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let rightChild,
        leftChild,
        swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild < element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap == null && rightChild < element) ||
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const kthmax = new KthLargest(4, [4, 5, 8, 8, 2]);
console.log(kthmax.add(3));
console.log(kthmax.add(5));
console.log(kthmax.add(10));
console.log(kthmax.add(9));
console.log(kthmax.add(4));
console.log(kthmax.heap.peek());
