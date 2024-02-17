define("discourse/controllers/forgot-password", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/cookie", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/lib/ajax-error", "discourse-common/lib/get-url", "@ember/utils"], function (_exports, _controller, _I18n, _modalFunctionality, _ajax, _cookie, _decorators, _utilities, _ajaxError, _getUrl, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/lib/cookie",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/lib/ajax-error",0,"discourse-common/lib/get-url",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("accountEmailOrUsername", "disabled"), (_obj = {
    offerHelp: null,
    helpSeen: false,
    submitDisabled(accountEmailOrUsername, disabled) {
      if (disabled) {
        return true;
      }
      if (this.siteSettings.hide_email_address_taken) {
        return !(accountEmailOrUsername || "").includes("@");
      } else {
        return (0, _utils.isEmpty)((accountEmailOrUsername || "").trim());
      }
    },
    onShow() {
      if ((0, _cookie.default)("email")) {
        this.set("accountEmailOrUsername", (0, _cookie.default)("email"));
      }
    },
    actions: {
      ok() {
        this.send("closeModal");
      },
      help() {
        this.setProperties({
          offerHelp: _I18n.default.t("forgot_password.help", {
            basePath: (0, _getUrl.default)("")
          }),
          helpSeen: true
        });
      },
      resetPassword() {
        if (this.submitDisabled) {
          return false;
        }
        this.set("disabled", true);
        this.clearFlash();
        (0, _ajax.ajax)("/session/forgot_password", {
          data: {
            login: this.accountEmailOrUsername.trim()
          },
          type: "POST"
        }).then(data => {
          const accountEmailOrUsername = (0, _utilities.escapeExpression)(this.accountEmailOrUsername);
          let key = "forgot_password.complete";
          key += accountEmailOrUsername.match(/@/) ? "_email" : "_username";
          if (data.user_found === false) {
            key += "_not_found";
            this.flash(_I18n.default.t(key, {
              email: accountEmailOrUsername,
              username: accountEmailOrUsername
            }), "error");
          } else {
            key += data.user_found ? "_found" : "";
            this.set("accountEmailOrUsername", "");
            this.set("offerHelp", _I18n.default.t(key, {
              email: accountEmailOrUsername,
              username: accountEmailOrUsername
            }));
            this.set("helpSeen", !data.user_found);
          }
        }).catch((0, _ajaxError.flashAjaxError)(this)).finally(() => {
          this.set("disabled", false);
        });
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj)), _obj)));
  _exports.default = _default;
});