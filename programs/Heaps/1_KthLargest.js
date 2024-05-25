/**
 * Kth Largest Element in a Stream
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/description/
 * Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

 * Implement KthLargest class:

 * KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
 * int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.
 * 

 * Example 1:

 * Input
 * ["KthLargest", "add", "add", "add", "add", "add"]
 * [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * Output
 * [null, 4, 5, 5, 8, 8]

 * Explanation
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3); *  // return 4
 * kthLargest.add(5); *  // return 5
 * kthLargest.add(10); * // return 5
 * kthLargest.add(9); *  // return 8
 * kthLargest.add(4); *  // return 8
 * 

 * Constraints:

 * 1 <= k <= 104
 * 0 <= nums.length <= 104
 * -104 <= nums[i] <= 104
 * -104 <= val <= 104
 * At most 104 calls will be made to add.
 * It is guaranteed that there will be at least k elements in the array when you search for the kth element.
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
class MinHeap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
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
    this.bubbleUp(this.values.length - 1);
  }
  bubbleUp(index) {
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      if (this.comparator(this.values[index], this.values[parentIdx]) < 0) {
        this.swap(index, parentIdx);
        index = parentIdx;
      } else {
        break;
      }
    }
  }
  extractMin() {
    const min = this.heap[0];
    const element = this.values.pop();
    if (this.values.length) {
      this.values[0] = element;
      this.bubbledown(0);
    }
  }
  bubbledown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (
      left < this.values.length &&
      this.comparator(this.values[smallest], this.values[left]) < 0
    ) {
      smallest = left;
    } else if (
      right < this.values.length &&
      this.comparator(this.values[smallest], this.values[right]) < 0
    ) {
      smallest = right;
    }
    if (smallest !== index) {
      this.swap(smallest, index);
      index = smallest;
      this.bubbledown(smallest);
    }
  }
  swap(idx1, idx2) {
    [this.values[idx1], this.values[idx2]] = [
      this.values[idx2],
      this.values[idx1],
    ];
  }
}
const kthmax = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthmax.add(3));
console.log(kthmax.add(5));
console.log(kthmax.add(10));
console.log(kthmax.add(9));
console.log(kthmax.add(4));
