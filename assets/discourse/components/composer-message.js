define("discourse/components/composer-message", ["exports", "@ember/component", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "discourse-common/lib/get-owner"], function (_exports, _component, _deprecated, _decorators, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("message.templateName"), (_obj = {
    classNameBindings: [":composer-popup", "message.extraClass"],
    layout(templateName) {
      return (0, _getOwner.getOwner)(this).lookup(`template:composer/${templateName}`);
    },
    actions: {
      closeMessage() {
        (0, _deprecated.default)('You should use `action=(closeMessage message)` instead of `action=(action "closeMessage")`', {
          id: "discourse.composer-message.closeMessage"
        });
        this.closeMessage(this.message);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "layout", [_dec], Object.getOwnPropertyDescriptor(_obj, "layout"), _obj)), _obj)));
  _exports.default = _default;
});