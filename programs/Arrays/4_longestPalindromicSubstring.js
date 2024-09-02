/**
 * Longest Palindromic Substring
 * https://leetcode.com/problems/longest-palindromic-substring/description/
 * Given a string s, return the longest
 * palindromic
 *
 * substring
 *  in s.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 * Example 2:
 *
 * Input: s = "cbbd"
 * Output: "bb"
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 */

var longestPalindromeBruteForce = function (s) {
  function checkPalindrome(str) {
    let i = 0,
      j = str.length - 1;
    while (i <= j) {
      if (str[i] !== str[j]) return false;

      i++;
      j--;
    }
    return true;
  }
  let maxLen = 1;
  let maxstr = s[0];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + maxLen; j <= s.length; j++) {
      if (j - i > maxLen && checkPalindrome(s.substring(i, j))) {
        maxLen = j - i;
        maxstr = s.substring(i, j);
      }
    }
  }
  return maxstr;
};
var longestPalindromeTLE = function (s) {
  function checkPalindrome(str) {
    let i = 0,
      j = str.length - 1;
    while (i <= j) {
      if (str[i] !== str[j]) return false;
      i++;
      j--;
    }
    return true;
  }
  let substringArr = [];
  for (let i = 0; i < s.length; i++) {
    let temp = "";
    for (let j = i; j < s.length; j++) {
      temp += s[j];
      substringArr.push(temp);
    }
  }

  let maxLen = 0;
  let maxstr = "";
  for (let i = 0; i < substringArr.length; i++) {
    if (substringArr[i].length > maxLen && checkPalindrome(substringArr[i])) {
      maxLen = substringArr[i].length;
      maxstr = substringArr[i];
    }
  }
  return maxstr;
};
//Expand Around Center
var longestPalindromeexpandAroundCenter = function (s) {
  function expandAroundCenter(l, r) {
    while (l >= 0 && r < s.length && s[l] == s[r]) {
      l--;
      r++;
    }
    return s.substring(l + 1, r);
  }

  let maxstr = s[0];
  for (let i = 0; i < s.length; i++) {
    let odd = expandAroundCenter(i, i);
    let even = expandAroundCenter(i, i + 1);
    if (odd.length > maxstr.length) {
      maxstr = odd;
    }
    if (even.length > maxstr.length) {
      maxstr = even;
    }
  }
  return maxstr;
};
var longestPalindrome = function (s) {
  const n = s.length;
  if (n == 1) return s;

  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  let start = 0,
    end = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      if (i == j) dp[i][j] = true;
      else if (i - j == 1) dp[i][j] = !!(s[i] == s[j]);
      else {
        dp[i][j] = s[i] == s[j] && dp[i - 1][j + 1];
      }

      if (i - j > end - start && dp[i][j]) {
        start = j;
        end = i;
      }
    }
  }
  return s.substring(start, end + 1);
};
longestPalindrome("babad");
