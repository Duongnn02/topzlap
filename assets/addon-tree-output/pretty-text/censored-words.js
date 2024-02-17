define("pretty-text/censored-words", ["exports", "discourse-common/utils/watched-words"], function (_exports, _watchedWords) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.censor = censor;
  _exports.censorFn = censorFn;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/watched-words"eaimeta@70e063a35619d71f
  function censorFn(regexpList, replacementLetter) {
    if (regexpList?.length) {
      replacementLetter = replacementLetter || "&#9632;";
      let censorRegexps = regexpList.map(regexp => {
        return (0, _watchedWords.createWatchedWordRegExp)((0, _watchedWords.toWatchedWord)(regexp));
      });
      return function (text) {
        censorRegexps.forEach(censorRegexp => {
          text = text.replace(censorRegexp, function (fullMatch) {
            for (var _len = arguments.length, groupMatches = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              groupMatches[_key - 1] = arguments[_key];
            }
            const stringMatch = groupMatches.find(g => typeof g === "string");
            return fullMatch.replace(stringMatch, new Array(stringMatch.length + 1).join(replacementLetter));
          });
        });
        return text;
      };
    }
    return function (t) {
      return t;
    };
  }
  function censor(text, censoredRegexp, replacementLetter) {
    return censorFn(censoredRegexp, replacementLetter)(text);
  }
});