/**
 * Last Stone Weight
 * https://leetcode.com/problems/last-stone-weight/description/
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.

 * We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

 * If x == y, both stones are destroyed, and
 * If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
 * At the end of the game, there is at most one stone left.

 * Return the weight of the last remaining stone. If there are no stones left, return 0.

 * 

 * Example 1:

 * Input: stones = [2,7,4,1,8,1]
 * Output: 1
 * Explanation: 
 * We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
 * we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
 * we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
 * we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
 * Example 2:

 * Input: stones = [1]
 * Output: 1
 * 

 * Constraints:

 * 1 <= stones.length <= 30
 * 1 <= stones[i] <= 1000
 */
class MaxHeap {
  constructor() {
    this.values = [];
  }
  size() {
    return this.values.length;
  }
  extractMax() {
    const max = this.values[0];
    const element = this.values.pop();
    if (this.values.length) {
      this.values[0] = element;
      this.bubbleDown();
    }
    return max;
  }
  bubbleDown() {
    const element = this.values[0];
    const length = this.values.length;
    let idx = 0;

    while (true) {
      let leftchildIdx = 2 * idx + 1;
      let rightchildIdx = 2 * idx + 2;
      let leftChild,
        rightChild,
        swap = null;
      if (leftchildIdx < length) {
        leftChild = this.values[leftchildIdx];
        if (leftChild > element) {
          swap = leftchildIdx;
        }
      }
      if (rightchildIdx < length) {
        rightChild = this.values[rightchildIdx];
        if (
          (swap == null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightchildIdx;
        }
      }
      if (swap == null) break;
      else {
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
      }
    }
  }
  peek() {
    if (!this.values.length) return 0;
    return this.values[0];
  }
  add(val) {
    this.values.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parentElement = this.values[parentIdx];

      if (element <= parentElement) break;
      else {
        this.values[parentIdx] = element;
        this.values[idx] = parentElement;
        idx = parentIdx;
      }
    }
  }
}
var lastStoneWeight = function (stones) {
  let heap = new MaxHeap();
  stones.forEach((element) => {
    heap.add(element);
  });
  while (heap.size() && heap.size() !== 1) {
    let y = heap.extractMax();
    let x = heap.extractMax();
    let blast = Math.abs(y - x);
    if (blast) {
      heap.add(blast);
    }
  }
  return heap.peek();
};

console.log(lastStoneWeight([1, 3]));

class MaxHeap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  size() {
    return this.values.length;
  }
  peek() {
    return this.values[0];
  }
  add(val) {
    this.values.push(val);
    this.heapifyUp(this.size() - 1);
  }
  heapifyUp(index) {
    while (index > 0) {
      const parentIdx = index;
      if (this.comparator(this.values[index], this.values[parentIdx]) > 0) {
        this.swap(index, parentIdx);
        index = parentIdx;
      } else {
        break;
      }
    }
  }
  extractMax() {
    const max = this.values[0];
    this.values[0] = this.values.pop();
    this.heapifyDown(0);
    return max;
  }
  heapifyDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (
      left < this.size() &&
      this.comparator(this.values[left], this.values[smallest]) > 0
    ) {
      smallest = left;
    }
    if (
      right < this.size() &&
      this.comparator(this.values[right], this.values[smallest]) > 0
    ) {
      smallest = right;
    }
    if (index !== smallest) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }
  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }
}
