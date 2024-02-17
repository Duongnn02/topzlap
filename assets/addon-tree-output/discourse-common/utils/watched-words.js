define("discourse-common/utils/watched-words", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createWatchedWordRegExp = createWatchedWordRegExp;
  _exports.toWatchedWord = toWatchedWord;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function createWatchedWordRegExp(word) {
    const caseFlag = word.case_sensitive ? "" : "i";
    return new RegExp(word.regexp, `${caseFlag}g`);
  }
  function toWatchedWord(regexp) {
    const [[regexpString, options]] = Object.entries(regexp);
    return {
      regexp: regexpString,
      ...options
    };
  }
});