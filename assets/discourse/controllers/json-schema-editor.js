define("discourse/controllers/json-schema-editor", ["exports", "@ember/object", "@ember/controller", "discourse/mixins/modal-functionality"], function (_exports, _object, _controller, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/controller",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    editor: null,
    saveChanges(value) {
      this.set("model.value", value);
      this.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "saveChanges", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveChanges"), _obj)), _obj));
  _exports.default = _default;
});