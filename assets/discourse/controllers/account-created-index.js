define("discourse/controllers/account-created-index", ["exports", "I18n", "@ember/controller", "discourse-common/lib/get-url", "discourse-common/utils/decorators", "discourse/lib/user-activation", "discourse/lib/waving-hand-url"], function (_exports, _I18n, _controller, _getUrl, _decorators, _userActivation, _wavingHandUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/controller",0,"discourse-common/lib/get-url",0,"discourse-common/utils/decorators",0,"discourse/lib/user-activation",0,"discourse/lib/waving-hand-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_obj = {
    envelopeImageUrl: (0, _getUrl.default)("/images/envelope.svg"),
    welcomeTitle() {
      return _I18n.default.t("invites.welcome_to", {
        site_name: this.siteSettings.title
      });
    },
    wavingHandURL: () => (0, _wavingHandUrl.wavingHandURL)(),
    actions: {
      sendActivationEmail() {
        (0, _userActivation.resendActivationEmail)(this.get("accountCreated.username")).then(() => {
          this.transitionToRoute("account-created.resent");
        });
      },
      editActivationEmail() {
        this.transitionToRoute("account-created.edit-email");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "welcomeTitle", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "welcomeTitle"), _obj), _applyDecoratedDescriptor(_obj, "wavingHandURL", [_decorators.default], (_init = Object.getOwnPropertyDescriptor(_obj, "wavingHandURL"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj)), _obj));
  _exports.default = _default;
});