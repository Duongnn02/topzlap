define("discourse/routes/group-activity-index", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  var _default = _route.default.extend({
    beforeModel() {
      const group = this.modelFor("group");
      if (group.can_see_members) {
        this.transitionTo("group.activity.posts");
      } else {
        this.transitionTo("group.activity.mentions");
      }
    }
  });
  _exports.default = _default;
});