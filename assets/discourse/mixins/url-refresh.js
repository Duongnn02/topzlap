define("discourse/mixins/url-refresh", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // A Mixin that a view can use to listen for 'url:refresh' when
  // it is on screen, and will send an action to refresh its data.
  //
  // This is useful if you want to get around Ember's default
  // behavior of not refreshing when navigating to the same place.
  var _default = {
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("url:refresh", this, "refresh");
    },
    willDestroyElement() {
      this._super(...arguments);
      this.appEvents.off("url:refresh", this, "refresh");
    }
  };
  _exports.default = _default;
});