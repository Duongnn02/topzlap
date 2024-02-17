define("discourse/lib/topic-fancy-title", ["exports", "discourse/models/site", "pretty-text/censored-words", "discourse/lib/text", "discourse/lib/text-direction"], function (_exports, _site, _censoredWords, _text, _textDirection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.fancyTitle = fancyTitle;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/site",0,"pretty-text/censored-words",0,"discourse/lib/text",0,"discourse/lib/text-direction"eaimeta@70e063a35619d71f
  function fancyTitle(topicTitle, supportMixedTextDirection) {
    let title = (0, _censoredWords.censor)((0, _text.emojiUnescape)(topicTitle) || "", _site.default.currentProp("censored_regexp"));
    if (supportMixedTextDirection) {
      const titleDir = (0, _textDirection.isRTL)(title) ? "rtl" : "ltr";
      return `<span dir="${titleDir}">${title}</span>`;
    }
    return title;
  }
});