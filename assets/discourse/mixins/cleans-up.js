define("discourse/mixins/cleans-up", ["exports", "@ember/object/mixin", "@ember/object/evented"], function (_exports, _mixin, _evented) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/object/evented"eaimeta@70e063a35619d71f
  // Include this mixin if you want to be notified when the dom should be
  // cleaned (usually on route change.)
  var _default = _mixin.default.create({
    _initializeChooser: (0, _evented.on)("didInsertElement", function () {
      this.appEvents.on("dom:clean", this, "cleanUp");
    }),
    _clearChooser: (0, _evented.on)("willDestroyElement", function () {
      this.appEvents.off("dom:clean", this, "cleanUp");
    })
  });
  _exports.default = _default;
});