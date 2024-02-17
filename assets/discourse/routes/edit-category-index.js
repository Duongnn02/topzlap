define("discourse/routes/edit-category-index", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    afterModel() {
      const params = this.paramsFor("editCategory");
      this.replaceWith(`/c/${params.slug}/edit/general`);
    }
  });
  _exports.default = _default;
});