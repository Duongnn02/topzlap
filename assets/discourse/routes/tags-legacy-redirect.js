define("discourse/routes/tags-legacy-redirect", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  var _default = _route.default.extend({
    beforeModel() {
      this.transitionTo("tag.show", this.paramsFor("tags.legacyRedirect").tag_id);
    }
  });
  _exports.default = _default;
});