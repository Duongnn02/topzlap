define("discourse/controllers/do-not-disturb", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _object, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    duration: null,
    setDuration(duration) {
      this.set("duration", duration);
      this.save();
    },
    save() {
      this.currentUser.enterDoNotDisturbFor(this.duration).then(() => {
        this.send("closeModal");
      }).catch((0, _ajaxError.flashAjaxError)(this));
    },
    navigateToNotificationSchedule() {
      this.transitionToRoute("preferences.notifications", this.currentUser);
      this.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "setDuration", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setDuration"), _obj), _applyDecoratedDescriptor(_obj, "navigateToNotificationSchedule", [_object.action], Object.getOwnPropertyDescriptor(_obj, "navigateToNotificationSchedule"), _obj)), _obj));
  _exports.default = _default;
});