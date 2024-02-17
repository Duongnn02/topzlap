define("discourse/controllers/download-calendar", ["exports", "@ember/object", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/download-calendar"], function (_exports, _object, _controller, _modalFunctionality, _downloadCalendar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/download-calendar"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    selectedCalendar: "ics",
    remember: false,
    downloadCalendar() {
      if (this.remember) {
        this.currentUser.user_option.set("default_calendar", this.selectedCalendar);
        this.currentUser.save(["default_calendar"]);
      }
      if (this.selectedCalendar === "ics") {
        (0, _downloadCalendar.downloadIcs)(this.model.title, this.model.dates);
      } else {
        (0, _downloadCalendar.downloadGoogle)(this.model.title, this.model.dates);
      }
      this.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "downloadCalendar", [_object.action], Object.getOwnPropertyDescriptor(_obj, "downloadCalendar"), _obj)), _obj));
  _exports.default = _default;
});