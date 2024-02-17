define("discourse/controllers/email-login", ["exports", "@ember/controller", "discourse/lib/url", "discourse/models/user", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "discourse/lib/webauthn", "discourse/lib/ajax-error", "@ember/service"], function (_exports, _controller, _url, _user, _ajax, _decorators, _getUrl, _webauthn, _ajaxError, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/url",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"discourse/lib/webauthn",0,"discourse/lib/ajax-error",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model"), _dec2 = (0, _decorators.default)("model"), (_obj = {
    router: (0, _service.inject)(),
    lockImageUrl: (0, _getUrl.default)("/images/lock.svg"),
    secondFactorRequired(model) {
      return model.security_key_required || model.second_factor_required;
    },
    secondFactorMethod(model) {
      return model.security_key_required ? _user.SECOND_FACTOR_METHODS.SECURITY_KEY : _user.SECOND_FACTOR_METHODS.TOTP;
    },
    actions: {
      finishLogin() {
        let data = {
          second_factor_method: this.secondFactorMethod,
          timezone: moment.tz.guess()
        };
        if (this.securityKeyCredential) {
          data.second_factor_token = this.securityKeyCredential;
        } else {
          data.second_factor_token = this.secondFactorToken;
        }
        (0, _ajax.ajax)({
          url: `/session/email-login/${this.model.token}`,
          type: "POST",
          data
        }).then(result => {
          if (result.success) {
            let destination = "/";
            const safeMode = new URL(this.router.currentURL, window.location.origin).searchParams.get("safe_mode");
            if (safeMode) {
              const params = new URLSearchParams();
              params.set("safe_mode", safeMode);
              destination += `?${params.toString()}`;
            }
            _url.default.redirectTo(destination);
          } else {
            this.set("model.error", result.error);
          }
        }).catch(_ajaxError.popupAjaxError);
      },
      authenticateSecurityKey() {
        (0, _webauthn.getWebauthnCredential)(this.model.challenge, this.model.allowed_credential_ids, credentialData => {
          this.set("securityKeyCredential", credentialData);
          this.send("finishLogin");
        }, errorMessage => {
          this.set("model.error", errorMessage);
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "secondFactorRequired", [_dec], Object.getOwnPropertyDescriptor(_obj, "secondFactorRequired"), _obj), _applyDecoratedDescriptor(_obj, "secondFactorMethod", [_dec2], Object.getOwnPropertyDescriptor(_obj, "secondFactorMethod"), _obj)), _obj)));
  _exports.default = _default;
});