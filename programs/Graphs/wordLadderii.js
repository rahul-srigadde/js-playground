/**
 * https://www.geeksforgeeks.org/problems/word-ladder-ii/1
 * Word Ladder II
 * Given two distinct words startWord and targetWord, and a list denoting wordList of unique words of equal lengths. Find all shortest transformation sequence(s) from startWord to targetWord. You can return them in any order possible.
 * Keep the following conditions in mind:

 * A word can only consist of lowercase characters.
 * Only one letter can be changed in each transformation.
 * Each transformed word must exist in the wordList including the targetWord.
 * startWord may or may not be part of the wordList.
 * Return an empty list if there is no such transformation sequence.
 * The first part of this problem can be found here.


 * Example 1:

 * Input:
 * startWord = "der", targetWord = "dfs",
 * wordList = {"des","der","dfr","dgt","dfs"}
 * Output:
 * der dfr dfs
 * der des dfs
 * Explanation:
 * The length of the smallest transformation is 3.
 * And the following are the only two ways to get
 * to targetWord:-
 * "der" -> "des" -> "dfs".
 * "der" -> "dfr" -> "dfs".
 * Example 2:

 * Input:
 * startWord = "gedk", targetWord = "geek", 
 * wordList = {"geek", "gefk"}
 * Output:
 * "gedk" -> "geek"

 * Your Task:
 * You don't need to read or print anything, Your task is to complete the function findSequences() which takes startWord, targetWord and wordList as input parameter and returns a list of list of strings of the shortest transformation sequence from startWord to targetWord.
 * Note: You don't have to return -1 in case of no possible sequence. Just return the Empty List.


 * Expected Time Compelxity: O(N*(logN * M * 26))
 * Expected Auxiliary Space: O(N * M) where N = length of wordList and M = |wordListi|


 * Constraints:
 * 1 ≤ N ≤ 100
 * 1 ≤ M ≤ 10
 */

/**
 *
 * it does not work on leet code
 */
var findLadders = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  const queue = [[beginWord]];
  const usedOnLevel = new Set([beginWord]);
  let level = 0;
  const ans = [];

  while (queue.length > 0) {
    const sequence = queue.shift();
    let word = sequence[sequence.length - 1];

    if (word === endWord) {
      if (ans.length === 0 || ans[0].length === sequence.length) {
        ans.push(sequence);
      }
      continue;
    }

    if (sequence.length > level) {
      level++;
      for (let word of usedOnLevel) {
        wordSet.delete(word);
      }
      usedOnLevel.clear();
    }

    for (let i = 0; i < word.length; i++) {
      const original = word[i];
      for (
        let charCode = "a".charCodeAt(0);
        charCode <= "z".charCodeAt(0);
        charCode++
      ) {
        const newWord =
          word.slice(0, i) + String.fromCharCode(charCode) + word.slice(i + 1);
        if (wordSet.has(newWord)) {
          const newSequence = [...sequence, newWord];
          queue.push(newSequence);
          usedOnLevel.add(newWord);
        }
      }
      word[i] = original;
    }
  }

  return ans;
};
const arr = [];
const op = findLadders("der", "dfs", ["des", "der", "dfr", "dgt", "dfs"]);
console.log(op);
