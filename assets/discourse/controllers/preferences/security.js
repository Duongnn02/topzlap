define("discourse/controllers/preferences/security", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/logout", "discourse/lib/show-modal", "discourse/lib/url", "discourse/mixins/can-check-emails", "I18n"], function (_exports, _controller, _object, _computed, _decorators, _ajax, _ajaxError, _logout, _showModal, _url, _canCheckEmails, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse/lib/logout",0,"discourse/lib/show-modal",0,"discourse/lib/url",0,"discourse/mixins/can-check-emails",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Number of tokens shown by default.
  const DEFAULT_AUTH_TOKENS_COUNT = 2;
  var _default = _controller.default.extend(_canCheckEmails.default, (_dec = (0, _decorators.default)("model.is_anonymous"), _dec2 = (0, _decorators.default)("showAllAuthTokens", "model.user_auth_tokens"), (_obj = {
    passwordProgress: null,
    subpageTitle: _I18n.default.t("user.preferences_nav.security"),
    showAllAuthTokens: false,
    canChangePassword(isAnonymous) {
      if (isAnonymous) {
        return false;
      } else {
        return !this.siteSettings.enable_discourse_connect && this.siteSettings.enable_local_logins;
      }
    },
    authTokens(showAllAuthTokens, tokens) {
      tokens.sort((a, b) => {
        if (a.is_active) {
          return -1;
        } else if (b.is_active) {
          return 1;
        } else {
          return b.seen_at.localeCompare(a.seen_at);
        }
      });
      return showAllAuthTokens ? tokens : tokens.slice(0, DEFAULT_AUTH_TOKENS_COUNT);
    },
    canShowAllAuthTokens: (0, _computed.gt)("model.user_auth_tokens.length", DEFAULT_AUTH_TOKENS_COUNT),
    changePassword(event) {
      event?.preventDefault();
      if (!this.passwordProgress) {
        this.set("passwordProgress", _I18n.default.t("user.change_password.in_progress"));
        return this.model.changePassword().then(() => {
          // password changed
          this.setProperties({
            changePasswordProgress: false,
            passwordProgress: _I18n.default.t("user.change_password.success")
          });
        }).catch(() => {
          // password failed to change
          this.setProperties({
            changePasswordProgress: false,
            passwordProgress: _I18n.default.t("user.change_password.error")
          });
        });
      }
    },
    toggleShowAllAuthTokens(event) {
      event?.preventDefault();
      this.toggleProperty("showAllAuthTokens");
    },
    revokeAuthToken(token, event) {
      event?.preventDefault();
      (0, _ajax.ajax)((0, _url.userPath)(`${this.get("model.username_lower")}/preferences/revoke-auth-token`), {
        type: "POST",
        data: token ? {
          token_id: token.id
        } : {}
      }).then(() => {
        if (!token) {
          (0, _logout.default)();
        } // All sessions revoked
      }).catch(_ajaxError.popupAjaxError);
    },
    actions: {
      save() {
        this.set("saved", false);
        return this.model.then(() => this.set("saved", true)).catch(_ajaxError.popupAjaxError);
      },
      showToken(token) {
        (0, _showModal.default)("auth-token", {
          model: token
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "canChangePassword", [_dec], Object.getOwnPropertyDescriptor(_obj, "canChangePassword"), _obj), _applyDecoratedDescriptor(_obj, "authTokens", [_dec2], Object.getOwnPropertyDescriptor(_obj, "authTokens"), _obj), _applyDecoratedDescriptor(_obj, "changePassword", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changePassword"), _obj), _applyDecoratedDescriptor(_obj, "toggleShowAllAuthTokens", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleShowAllAuthTokens"), _obj), _applyDecoratedDescriptor(_obj, "revokeAuthToken", [_object.action], Object.getOwnPropertyDescriptor(_obj, "revokeAuthToken"), _obj)), _obj)));
  _exports.default = _default;
});