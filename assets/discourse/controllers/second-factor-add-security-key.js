define("discourse/controllers/second-factor-add-security-key", ["exports", "discourse/lib/webauthn", "@ember/controller", "I18n", "discourse/mixins/modal-functionality"], function (_exports, _webauthn, _controller, _I18n, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/webauthn",0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  // model for this controller is user
  var _default = _controller.default.extend(_modalFunctionality.default, {
    loading: false,
    errorMessage: null,
    onShow() {
      let securityKeyName;
      if (this.capabilities.isIOS && !this.capabilities.isIpadOS) {
        securityKeyName = _I18n.default.t("user.second_factor.security_key.iphone_default_name");
      } else if (this.capabilities.isAndroid) {
        securityKeyName = _I18n.default.t("user.second_factor.security_key.android_default_name");
      } else {
        securityKeyName = _I18n.default.t("user.second_factor.security_key.default_name");
      }
      // clear properties every time because the controller is a singleton
      this.setProperties({
        errorMessage: null,
        loading: true,
        securityKeyName,
        webauthnUnsupported: !(0, _webauthn.isWebauthnSupported)()
      });
      this.model.requestSecurityKeyChallenge().then(response => {
        if (response.error) {
          this.set("errorMessage", response.error);
          return;
        }
        this.setProperties({
          errorMessage: (0, _webauthn.isWebauthnSupported)() ? null : _I18n.default.t("login.security_key_support_missing_error"),
          loading: false,
          challenge: response.challenge,
          relayingParty: {
            id: response.rp_id,
            name: response.rp_name
          },
          supported_algorithms: response.supported_algorithms,
          user_secure_id: response.user_secure_id,
          existing_active_credential_ids: response.existing_active_credential_ids
        });
      }).catch(error => {
        this.send("closeModal");
        this.onError(error);
      }).finally(() => this.set("loading", false));
    },
    actions: {
      registerSecurityKey() {
        if (!this.securityKeyName) {
          this.set("errorMessage", _I18n.default.t("user.second_factor.security_key.name_required_error"));
          return;
        }
        const publicKeyCredentialCreationOptions = {
          challenge: Uint8Array.from(this.challenge, c => c.charCodeAt(0)),
          rp: {
            name: this.relayingParty.name,
            id: this.relayingParty.id
          },
          user: {
            id: Uint8Array.from(this.user_secure_id, c => c.charCodeAt(0)),
            displayName: this.model.username_lower,
            name: this.model.username_lower
          },
          pubKeyCredParams: this.supported_algorithms.map(alg => {
            return {
              type: "public-key",
              alg
            };
          }),
          excludeCredentials: this.existing_active_credential_ids.map(credentialId => {
            return {
              type: "public-key",
              id: (0, _webauthn.stringToBuffer)(atob(credentialId))
            };
          }),
          timeout: 20000,
          attestation: "none",
          authenticatorSelection: {
            // see https://chromium.googlesource.com/chromium/src/+/master/content/browser/webauth/uv_preferred.md for why
            // default value of preferred is not necessarily what we want, it limits webauthn to only devices that support
            // user verification, which usually requires entering a PIN
            userVerification: "discouraged"
          }
        };
        navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        }).then(credential => {
          let serverData = {
            id: credential.id,
            rawId: (0, _webauthn.bufferToBase64)(credential.rawId),
            type: credential.type,
            attestation: (0, _webauthn.bufferToBase64)(credential.response.attestationObject),
            clientData: (0, _webauthn.bufferToBase64)(credential.response.clientDataJSON),
            name: this.securityKeyName
          };
          this.model.registerSecurityKey(serverData).then(response => {
            if (response.error) {
              this.set("errorMessage", response.error);
              return;
            }
            this.markDirty();
            this.set("errorMessage", null);
            this.send("closeModal");
          }).catch(error => this.onError(error)).finally(() => this.set("loading", false));
        }, err => {
          if (err.name === "InvalidStateError") {
            return this.set("errorMessage", _I18n.default.t("user.second_factor.security_key.already_added_error"));
          }
          if (err.name === "NotAllowedError") {
            return this.set("errorMessage", _I18n.default.t("user.second_factor.security_key.not_allowed_error"));
          }
          this.set("errorMessage", err.message);
        });
      }
    }
  });
  _exports.default = _default;
});