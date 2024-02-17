define("discourse/components/watch-read", ["exports", "discourse-common/utils/decorators", "@ember/component", "discourse/lib/is-element-in-viewport"], function (_exports, _decorators, _component, _isElementInViewport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/component",0,"discourse/lib/is-element-in-viewport"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_obj = {
    didInsertElement() {
      this._super(...arguments);
      const currentUser = this.currentUser;
      if (!currentUser) {
        return;
      }
      const path = this.path;
      if (path === "faq" || path === "guidelines") {
        this._markRead();
        window.addEventListener("resize", this._markRead, false);
        window.addEventListener("scroll", this._markRead, false);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      window.removeEventListener("resize", this._markRead);
      window.removeEventListener("scroll", this._markRead);
    },
    _markRead() {
      const faqUnread = !this.currentUser.read_faq;
      if (faqUnread && (0, _isElementInViewport.default)(document.querySelector(".contents p:last-child"))) {
        this.action();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_markRead", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_markRead"), _obj)), _obj));
  _exports.default = _default;
});