define("discourse/helpers/directory-table-header-title", ["exports", "discourse-common/lib/helpers", "I18n", "discourse-common/lib/icon-library", "@ember/template"], function (_exports, _helpers, _I18n, _iconLibrary, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"I18n",0,"discourse-common/lib/icon-library",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.registerUnbound)("directory-table-header-title", function (args) {
    // Args should include key/values { field, labelKey, icon, translated }

    let html = "";
    if (args.icon) {
      html += (0, _iconLibrary.iconHTML)(args.icon);
    }
    let labelKey = args.labelKey || `directory.${args.field}`;
    html += args.translated ? args.field : _I18n.default.t(labelKey + "_long", {
      defaultValue: _I18n.default.t(labelKey)
    });
    return (0, _template.htmlSafe)(html);
  });
  _exports.default = _default;
});