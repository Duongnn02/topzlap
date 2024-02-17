define("discourse/helpers/emoji", ["discourse/lib/text", "discourse/lib/utilities", "@ember/template", "discourse-common/lib/helpers"], function (_text, _utilities, _template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/text",0,"discourse/lib/utilities",0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("emoji", function (code, options) {
    const escaped = (0, _utilities.escapeExpression)(`:${code}:`);
    return (0, _template.htmlSafe)((0, _text.emojiUnescape)(escaped, options));
  });
});