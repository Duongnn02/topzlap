define("discourse/helpers/discourse-tag", ["exports", "@ember/template", "discourse-common/lib/helpers", "discourse/lib/render-tag"], function (_exports, _template, _helpers, _renderTag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse/lib/render-tag"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.registerUnbound)("discourse-tag", function (name, params) {
    return (0, _template.htmlSafe)((0, _renderTag.default)(name, params));
  });
  _exports.default = _default;
});