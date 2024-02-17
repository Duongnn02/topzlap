define("discourse/services/app-events", ["exports", "@ember/object/evented", "@ember/service"], function (_exports, _evented, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/evented",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _service.default.extend(_evented.default, {
    init() {
      this._super(...arguments);

      // A hack because we don't make `current user` properly via container in testing mode
      if (this.currentUser) {
        this.currentUser.appEvents = this;
      }
    }
  });
  _exports.default = _default;
});