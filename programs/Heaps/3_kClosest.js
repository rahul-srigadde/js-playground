/**
 * K Closest Points to Origin
 * https://neetcode.io/problems/k-closest-points-to-origin
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

 * The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

 * You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

 * 

 * Example 1:


 * Input: points = [[1,3],[-2,2]], k = 1
 * Output: [[-2,2]]
 * Explanation:
 * The distance between (1, 3) and the origin is sqrt(10).
 * The distance between (-2, 2) and the origin is sqrt(8).
 * Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
 * We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
 * Example 2:

 * Input: points = [[3,3],[5,-1],[-2,4]], k = 2
 * Output: [[3,3],[-2,4]]
 * Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 * 

 * Constraints:

 * 1 <= k <= points.length <= 104
 * -104 <= xi, yi <= 104
 */
class ClosetPoints {
  constructor(points, k) {
    this.k = k;
    this.heap = new Maxheap(); // this.heap = new Maxheap((a,b) => a.distance - b.distance)

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

class Maxheap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  getpoints() {
    return this.values.map((x) => x.point);
  }
  peek() {
    return this.values[0];
  }
  size() {
    return this.values.length;
  }
  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }
  insert(point) {
    const node = new Node(point);
    this.values.push(node);
    this.heapifyUp(this.size() - 1);
  }
  heapifyUp(index) {
    while (index) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.comparator(this.values[index], this.values[parentIdx]) > 0) {
        this.swap[(index, parentIdx)];
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

    if (index != smallest) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
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
