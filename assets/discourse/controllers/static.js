define("discourse/controllers/static", ["exports", "@ember/controller", "discourse/lib/ajax", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/url", "discourse/lib/waving-hand-url"], function (_exports, _controller, _ajax, _decorators, _computed, _url, _wavingHandUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj, _init, _init2;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/url",0,"discourse/lib/waving-hand-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.path"), _dec2 = (0, _decorators.default)("model.path"), (_obj = {
    application: (0, _controller.inject)(),
    showLoginButton: (0, _computed.equal)("model.path", "login"),
    anyButtons: (0, _computed.or)("showLoginButton", "showSignupButton"),
    bodyClass: path => `static-${path}`,
    showSignupButton() {
      return this.get("model.path") === "login" && this.get("application.canSignUp");
    },
    wavingHandURL: () => (0, _wavingHandUrl.wavingHandURL)(),
    actions: {
      markFaqRead() {
        const currentUser = this.currentUser;
        if (currentUser) {
          (0, _ajax.ajax)((0, _url.userPath)("read-faq"), {
            type: "POST"
          }).then(() => {
            currentUser.set("read_faq", true);
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "bodyClass", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "bodyClass"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showSignupButton", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showSignupButton"), _obj), _applyDecoratedDescriptor(_obj, "wavingHandURL", [_decorators.default], (_init2 = Object.getOwnPropertyDescriptor(_obj, "wavingHandURL"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj)), _obj)));
  _exports.default = _default;
});