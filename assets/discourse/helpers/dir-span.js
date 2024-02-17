define("discourse/helpers/dir-span", ["exports", "discourse-common/lib/helpers", "@ember/template", "discourse/lib/text-direction", "discourse/lib/utilities"], function (_exports, _helpers, _template, _textDirection, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"@ember/template",0,"discourse/lib/text-direction",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function setDir(text) {
    let content = text ? text : "";
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    if (content && siteSettings.support_mixed_text_direction) {
      let textDir = (0, _textDirection.isRTL)(content) ? "rtl" : "ltr";
      return `<span dir="${textDir}">${content}</span>`;
    }
    return content;
  }
  var _default = (0, _helpers.registerUnbound)("dir-span", function (str) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let isHtmlSafe = false;
    if (params.htmlSafe) {
      isHtmlSafe = params.htmlSafe === "true";
    }
    let text = isHtmlSafe ? str : (0, _utilities.escapeExpression)(str);
    return (0, _template.htmlSafe)(setDir(text));
  });
  _exports.default = _default;
});