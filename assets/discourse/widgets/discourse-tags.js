define("discourse/widgets/discourse-tags", ["exports", "discourse/widgets/raw-html", "discourse/lib/render-tags"], function (_exports, _rawHtml, _renderTags) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse/lib/render-tags"eaimeta@70e063a35619d71f
  // Right now it's RawHTML. Eventually it should emit nodes
  class DiscourseTags extends _rawHtml.default {
    constructor(attrs) {
      attrs.html = (0, _renderTags.default)(attrs.topic, attrs);
      super(attrs);
    }
  }
  _exports.default = DiscourseTags;
});