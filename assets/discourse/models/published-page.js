define("discourse/models/published-page", ["exports", "discourse/models/rest", "@ember/object", "discourse-common/lib/get-url"], function (_exports, _rest, _object, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/rest",0,"@ember/object",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  var _default = _rest.default.extend({
    url: (0, _object.computed)("slug", function () {
      return (0, _getUrl.getAbsoluteURL)(`/pub/${this.slug}`);
    })
  });
  _exports.default = _default;
});