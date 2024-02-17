define("discourse/widgets/emoji", ["exports", "discourse/lib/text", "discourse/widgets/raw-html", "discourse/widgets/widget", "discourse/lib/utilities"], function (_exports, _text, _rawHtml, _widget, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.replaceEmoji = replaceEmoji;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/text",0,"discourse/widgets/raw-html",0,"discourse/widgets/widget",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function replaceEmoji(str) {
    const escaped = (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(str));
    return [new _rawHtml.default({
      html: `<span>${escaped}</span>`
    })];
  }
  var _default = (0, _widget.createWidget)("emoji", {
    tagName: "img.emoji",
    buildAttributes(attrs) {
      let result = {
        src: (0, _text.emojiUrlFor)(attrs.name),
        alt: `:${attrs.alt || attrs.name}:`
      };
      if (attrs.title) {
        result.title = typeof attrs.title === "string" ? attrs.title : attrs.name;
      }
      return result;
    }
  });
  _exports.default = _default;
});