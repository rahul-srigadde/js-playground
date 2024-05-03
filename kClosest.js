class ClosetPoints {
  constructor(points, k) {
    this.k = k;
    this.heap = new Maxheap();
    points.forEach((element) => {
      this.add(element);
    });
  }
  add(point) {
    if (this.heap.size() < this.k) {
      this.heap.insert(point);
    } else if (
      this.heap.peek().distance > Math.sqrt(point[0] ** 2 + point[1] ** 2)
    ) {
      this.heap.insert(point);
      this.heap.extractMax();
    }
  }
  getKCloset() {
    return this.heap.getPoints();
  }
}

class Node {
  constructor(point) {
    this.point = point;
    this.distance = Math.sqrt(point[0] ** 2 + point[1] ** 2);
  }
}
class Maxheap {
  constructor() {
    this.values = [];
  }
  getPoints() {
    return this.values.map((x) => x.point);
  }
  peek() {
    return this.values[0];
  }
  size() {
    return this.values.length;
  }
  insert(point) {
    const node = new Node(point);
    this.values.push(node);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parentElement = this.values[parentIdx];
      if (element.distance <= parentElement.distance) break;
      else {
        this.values[parentIdx] = element;
        this.values[idx] = parentElement;
        idx = parentIdx;
      }
    }
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
        if (leftChild.distance > element.distance) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap == null && rightChild.distance > element.distance) ||
          (swap != null && rightChild.distance > leftChild.distance)
        ) {
          swap = rightChildIdx;
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
}

var kClosest = function (points, k) {
  const kclosetPoints = new ClosetPoints(points, k);
  console.log(kclosetPoints.getKCloset());
};
kClosest(
  [
    [68, 97],
    [34, -84],
    [60, 100],
    [2, 31],
    [-27, -38],
    [-73, -74],
    [-55, -39],
    [62, 91],
    [62, 92],
    [-57, -67],
  ],
  5
);
