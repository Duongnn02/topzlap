define("discourse/helpers/discourse-tags", ["exports", "@ember/template", "discourse-common/lib/helpers", "discourse/lib/render-tags"], function (_exports, _template, _helpers, _renderTags) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse/lib/render-tags"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.registerUnbound)("discourse-tags", function (topic, params) {
    return (0, _template.htmlSafe)((0, _renderTags.default)(topic, params));
  });
  _exports.default = _default;
});