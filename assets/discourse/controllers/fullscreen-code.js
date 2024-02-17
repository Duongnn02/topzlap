define("discourse/controllers/fullscreen-code", ["exports", "@ember/controller", "discourse-common/utils/decorators", "discourse/mixins/modal-functionality", "discourse/lib/highlight-syntax", "discourse/lib/codeblock-buttons"], function (_exports, _controller, _decorators, _modalFunctionality, _highlightSyntax, _codeblockButtons) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/mixins/modal-functionality",0,"discourse/lib/highlight-syntax",0,"discourse/lib/codeblock-buttons"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    onShow() {
      this._applyCodeblockButtons();
    },
    onClose() {
      this.codeBlockButtons.cleanup();
    },
    _applyCodeblockButtons() {
      const modalElement = document.querySelector(".modal-body");
      (0, _highlightSyntax.default)(modalElement, this.siteSettings, this.session);
      this.codeBlockButtons = new _codeblockButtons.default({
        showFullscreen: false,
        showCopy: true
      });
      this.codeBlockButtons.attachToGeneric(modalElement);
    }
  }, (_applyDecoratedDescriptor(_obj, "_applyCodeblockButtons", [_decorators.afterRender], Object.getOwnPropertyDescriptor(_obj, "_applyCodeblockButtons"), _obj)), _obj));
  _exports.default = _default;
});