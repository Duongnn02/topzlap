define("discourse/mixins/modal-update-existing-users", ["exports", "@ember/object/mixin"], function (_exports, _mixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    onShow() {
      this.set("updateExistingUsers", null);
    },
    actions: {
      updateExistingUsers() {
        this.set("updateExistingUsers", true);
        this.send("closeModal");
      },
      cancel() {
        this.set("updateExistingUsers", false);
        this.send("closeModal");
      }
    }
  });
  _exports.default = _default;
});