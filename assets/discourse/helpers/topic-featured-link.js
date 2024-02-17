define("discourse/helpers/topic-featured-link", ["exports", "@ember/template", "discourse-common/lib/helpers", "discourse/lib/render-topic-featured-link"], function (_exports, _template, _helpers, _renderTopicFeaturedLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse/lib/render-topic-featured-link"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.registerUnbound)("topic-featured-link", function (topic, params) {
    return (0, _template.htmlSafe)((0, _renderTopicFeaturedLink.default)(topic, params));
  });
  _exports.default = _default;
});