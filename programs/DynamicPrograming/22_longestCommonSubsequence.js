/**
 * Longest Common Subsequence
 * https://leetcode.com/problems/longest-common-subsequence/description/
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
 *
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 *
 *
 *
 * Example 1:
 *
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Explanation: The longest common subsequence is "ace" and its length is 3.
 * Example 2:
 *
 * Input: text1 = "abc", text2 = "abc"
 * Output: 3
 * Explanation: The longest common subsequence is "abc" and its length is 3.
 * Example 3:
 *
 * Input: text1 = "abc", text2 = "def"
 * Output: 0
 * Explanation: There is no such common subsequence, so the result is 0.
 *
 *
 * Constraints:
 *
 * 1 <= text1.length, text2.length <= 1000
 * text1 and text2 consist of only lowercase English characters.
 *
 */

var longestCommonSubsequence = function (text1, text2) {
  let text1len = text1.length;
  let text2len = text2.length;
  let dp = Array.from({ length: text1len }, () => Array(text2len).fill(-1));
  function solve(index1, index2) {
    if (index1 < 0 || index2 < 0) return 0;

    if (dp[index1][index2] != -1) return dp[index1][index2];

    if (text1[index1] === text2[index2]) {
      return (dp[index1][index2] = 1 + solve(index1 - 1, index2 - 1));
    } else {
      return (dp[index1][index2] = Math.max(
        solve(index1, index2 - 1),
        solve(index1 - 1, index2)
      ));
    }
  }
  solve(text1len - 1, text2len - 1);
  return dp[text1len - 1][text2len - 1];
};

var longestCommonSubsequence = function (text1, text2) {
  let text1len = text1.length;
  let text2len = text2.length;
  let dp = Array.from({ length: text1len + 1 }, () =>
    Array(text2len + 1).fill(0)
  );
  for (let i = 0; i <= text1.length; i++) {
    dp[i][0] = 0;
  }
  for (let i = 0; i <= text2.length; i++) {
    dp[0][i] = 0;
  }
  for (let index1 = 1; index1 <= text1len; index1++) {
    for (let index2 = 1; index2 <= text2len; index2++) {
      if (text1[index1 - 1] == text2[index2 - 1]) {
        dp[index1][index2] = 1 + dp[index1 - 1][index2 - 1];
      } else {
        dp[index1][index2] = Math.max(
          dp[index1][index2 - 1],
          dp[index1 - 1][index2]
        );
      }
    }
  }
  return dp[text1len][text2len];
};

var longestCommonSubsequence = function (text1, text2) {
  let text1len = text1.length;
  let text2len = text2.length;
  const prev = new Array(m + 1).fill(0);
  const cur = new Array(m + 1).fill(0);
  for (let index1 = 1; index1 <= text1len; index1++) {
    for (let index2 = 1; index2 <= text2len; index2++) {
      if (text1[index1 - 1] == text2[index2 - 1]) {
        cur[index2] = 1 + prev[index2 - 1];
      } else {
        cur[index2] = Math.max(cur[index2 - 1], prev[index2]);
      }
    }
    prev = [...cur];
  }

  return prev[text2len];
};
