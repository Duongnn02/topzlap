define("discourse/routes/user-index", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel() {
      const {
        currentUser
      } = this;
      const viewingMe = currentUser && currentUser.get("username") === this.modelFor("user").get("username");
      const destination = viewingMe ? "userActivity" : "user.summary";

      // HACK: Something with the way the user card intercepts clicks seems to break how the
      // transition into a user's activity works. This makes the back button work on mobile
      // where there is no user card as well as desktop where there is.
      if (this.site.mobileView) {
        this.replaceWith(destination);
      } else {
        this.transitionTo(destination);
      }
    }
  });
  _exports.default = _default;
});