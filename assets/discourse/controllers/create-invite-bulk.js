define("discourse/controllers/create-invite-bulk", ["exports", "@ember/controller", "@ember/object", "discourse/mixins/modal-functionality"], function (_exports, _controller, _object, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    data: null,
    onShow() {
      this.set("data", null);
    },
    onClose() {
      if (this.data) {
        this.data.abort();
        this.set("data", null);
      }
    },
    submit(data) {
      this.set("data", data);
      data.submit();
    }
  }, (_applyDecoratedDescriptor(_obj, "submit", [_object.action], Object.getOwnPropertyDescriptor(_obj, "submit"), _obj)), _obj));
  _exports.default = _default;
});