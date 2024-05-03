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
