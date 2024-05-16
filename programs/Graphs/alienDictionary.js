/**
 * https://www.geeksforgeeks.org/problems/alien-dictionary/1
 * Given a sorted dictionary of an alien language having N words and k starting alphabets of standard dictionary.
 * Find the order of characters in the alien language.
 * Note: Many orders may be possible for a particular test case, 
 * thus you may return any valid order and output will be 1 
 * if the order of string returned by the function is correct else 0 denoting incorrect string returned.
 * 
 * Example 1:

 * Input: 
 * N = 5, K = 4
 * dict = {"baa","abcd","abca","cab","cad"}
 * Output:
 * 1
 * Explanation:
 * Here order of characters is 
 * 'b', 'd', 'a', 'c' Note that words are sorted 
 * and in the given language "baa" comes before 
 * "abcd", therefore 'b' is before 'a' in output.
 * Similarly we can find other orders.
 * Example 2:

 * Input: 
 * N = 3, K = 3
 * dict = {"caa","aaa","aab"}
 * Output:
 * 1
 * Explanation:
 * Here order of characters is
 * 'c', 'a', 'b' Note that words are sorted
 * and in the given language "caa" comes before
 * "aaa", therefore 'c' is before 'a' in output.
 * Similarly we can find other orders.
 * 

 * Your Task:
 * You don't need to read or print anything. 
 * Your task is to complete the function findOrder() which takes  the string array dict[], 
 * its size N and the integer K as input parameter and 
 * returns a string denoting the order of characters in the alien language.


 * Expected Time Complexity: O(N * |S| + K) , where |S| denotes maximum length.
 * Expected Space Compelxity: O(K)


 * Constraints:
 * 1 ≤ N, M ≤ 300
 * 1 ≤ K ≤ 26
 * 1 ≤ Length of words ≤ 50
 */
class Solution {
  toposort(v, adjls) {
    let indegree = new Array(v).fill(0);
    for (const edges of adjls) {
      for (const edge of edges) {
        indegree[edge]++;
      }
    }
    let queue = [];
    for (let i = 0; i < v; i++) {
      if (indegree[i] === 0) queue.push(i);
    }
    let result = [];
    while (queue.length) {
      const node = queue.shift();
      result.push(node);
      for (const edge of adjls[node]) {
        indegree[edge]--;
        if (indegree[edge] === 0) queue.push(i);
      }
    }
    return result;
  }
  createZeroBasedIndexforAlphabets(x) {
    return x[0].charCodeAt(0) - 97;
  }
  numberToAlphabet(number) {
    return String.fromCharCode(97 + number);
  }
  findOrder(dict, N, K) {
    //code here
    let graph = new Array(K).fill(0).map(() => []);
    for (let i = 0; i < N - 1; i++) {
      let s1 = dict[i];
      let s2 = dict[i + 1];
      for (let j = 0; i < Math.min(s1.length, s2.length); i++) {
        if (s1[j] != s2[j]) {
          graph[createZeroBasedIndexforAlphabets(s1[j])].push(
            createZeroBasedIndexforAlphabets(s2[j])
          );
        }
      }
    }
    const result = this.toposort(K, graph);
    return result.map((x) => numberToAlphabet(x));
  }
}
