/**
 * https://leetcode.com/problems/word-ladder/description/
 * Word Ladder
 * A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

 * Every adjacent pair of words differs by a single letter.
 * Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
 * sk == endWord
 * Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 * 

 * Example 1:

 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: 5
 * Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
 * Example 2:

 * Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
 * Output: 0
 * Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 * 

 * Constraints:

 * 1 <= beginWord.length <= 10
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 5000
 * wordList[i].length == beginWord.length
 * beginWord, endWord, and wordList[i] consist of lowercase English letters.
 * beginWord != endWord
 * All the words in wordList are unique.
 */

var ladderLength = function (beginWord, endWord, wordList) {
  let queue = [[beginWord, 1]];
  const wordSet = new Set(wordList);
  wordSet.delete(beginWord);

  while (queue.length) {
    let [word, dist] = queue.shift();
    if (word === endWord) return dist;
    wordSet.delete(word);
    for (let i = 0; i < word.length; i++) {
      let original = word[i];
      for (
        let charCode = "a".charCodeAt(0);
        charCode <= "z".charCodeAt(0);
        charCode++
      ) {
        const ch = String.fromCharCode(charCode);
        word = word.slice(0, i) + ch + word.slice(i + 1);
        if (wordSet.has(word)) {
          wordSet.delete(word);
          queue.push([word, dist + 1]);
        }
      }

      word = word.slice(0, i) + original + word.slice(i + 1);
    }
  }
  return 0;
};

const arr = [];
const op = ladderLength("hit", "cog", [
  "hot",
  "dot",
  "dog",
  "lot",
  "log",
  "cog",
]);
console.log(op);
