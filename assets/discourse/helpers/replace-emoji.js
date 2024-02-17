define("discourse/helpers/replace-emoji", ["discourse/lib/text", "@ember/template", "discourse-common/lib/helpers", "discourse/lib/utilities"], function (_text, _template, _helpers, _utilities) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/text",0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("replace-emoji", (text, options) => {
    text = (0, _template.isHTMLSafe)(text) ? text.toString() : (0, _utilities.escapeExpression)(text);
    return (0, _template.htmlSafe)((0, _text.emojiUnescape)(text, options));
  });
});