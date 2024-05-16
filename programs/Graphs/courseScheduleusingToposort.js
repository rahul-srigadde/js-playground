/**
 * https://leetcode.com/problems/course-schedule/description/
 * Course Schedule
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.

 * 

 * Example 1:

 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0. So it is possible.
 * Example 2:

 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 * 

 * Constraints:

 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= 5000
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * All the pairs prerequisites[i] are unique.
 */

var canFinish = function (numCourses, prerequisites) {
  let indegree = Array(numCourses).fill(0);
  let queue = [];
  let result = [];
  let graph = new Array(numCourses).fill(0).map(() => []);
  for (let [course, pre] of prerequisites) {
    graph[course].push(pre);
  }
  for (const edges of graph) {
    for (const edge of edges) {
      indegree[edge]++;
    }
  }
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const edge of graph[node]) {
      indegree[edge]--;
      if (indegree[edge] === 0) queue.push(edge);
    }
  }
  return result.length === numCourses;
};

const op = canFinish(2, [
  [1, 0],
  [0, 1],
]);

console.log(op);
