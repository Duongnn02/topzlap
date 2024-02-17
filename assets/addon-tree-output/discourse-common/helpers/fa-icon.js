define("discourse-common/helpers/fa-icon", ["exports", "discourse-common/lib/deprecated", "@ember/template", "discourse-common/lib/helpers", "discourse-common/lib/icon-library"], function (_exports, _deprecated, _template, _helpers, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.iconHTML = iconHTML;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function iconHTML(id, params) {
    return (0, _iconLibrary.renderIcon)("string", id, params);
  }
  (0, _helpers.registerUnbound)("fa-icon", function (icon, params) {
    (0, _deprecated.default)("Use `{{d-icon}}` instead of `{{fa-icon}}");
    return (0, _template.htmlSafe)(iconHTML(icon, params));
  });
});