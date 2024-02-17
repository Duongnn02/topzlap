define("discourse/controllers/preferences/users", ["exports", "@ember/object", "@ember/object/computed", "@ember/controller", "discourse-common/utils/decorators", "discourse-common/lib/helpers", "discourse/lib/ajax-error"], function (_exports, _object, _computed, _controller, _decorators, _helpers, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse-common/lib/helpers",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.trust_level"), _dec2 = (0, _decorators.default)("userCanIgnore", "model.staff"), _dec3 = (0, _decorators.default)("model.user_option.allow_private_messages"), (_obj = {
    ignoredUsernames: (0, _computed.alias)("model.ignored_usernames"),
    userCanIgnore(trustLevel) {
      return trustLevel >= this.siteSettings.min_trust_level_to_allow_ignore;
    },
    ignoredEnabled(userCanIgnore, userIsStaff) {
      return this.currentUser.staff || userCanIgnore || userIsStaff;
    },
    allowPmUsersEnabled: (0, _computed.and)("model.user_option.enable_allowed_pm_users", "model.user_option.allow_private_messages"),
    mutedUsernames: (0, _object.computed)("model.muted_usernames", {
      get() {
        let usernames = this.model.muted_usernames;
        if (typeof usernames === "string") {
          usernames = usernames.split(",").filter(Boolean);
        }
        return (0, _helpers.makeArray)(usernames).uniq();
      }
    }),
    allowedPmUsernames: (0, _object.computed)("model.allowed_pm_usernames", {
      get() {
        let usernames = this.model.allowed_pm_usernames;
        if (typeof usernames === "string") {
          usernames = usernames.split(",").filter(Boolean);
        }
        return (0, _helpers.makeArray)(usernames).uniq();
      }
    }),
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["allow_private_messages", "muted_usernames", "allowed_pm_usernames", "enable_allowed_pm_users"];
    },
    onChangeMutedUsernames(usernames) {
      this.model.set("muted_usernames", usernames.uniq().join(","));
    },
    onChangeAllowedPmUsernames(usernames) {
      this.model.set("allowed_pm_usernames", usernames.uniq().join(","));
    },
    disableAllowPmUsersSetting(allowPrivateMessages) {
      return !allowPrivateMessages;
    },
    save() {
      this.set("saved", false);
      return this.model.save(this.saveAttrNames).then(() => this.set("saved", true)).catch(_ajaxError.popupAjaxError);
    }
  }, (_applyDecoratedDescriptor(_obj, "userCanIgnore", [_dec], Object.getOwnPropertyDescriptor(_obj, "userCanIgnore"), _obj), _applyDecoratedDescriptor(_obj, "ignoredEnabled", [_dec2], Object.getOwnPropertyDescriptor(_obj, "ignoredEnabled"), _obj), _applyDecoratedDescriptor(_obj, "onChangeMutedUsernames", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeMutedUsernames"), _obj), _applyDecoratedDescriptor(_obj, "onChangeAllowedPmUsernames", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeAllowedPmUsernames"), _obj), _applyDecoratedDescriptor(_obj, "disableAllowPmUsersSetting", [_dec3], Object.getOwnPropertyDescriptor(_obj, "disableAllowPmUsersSetting"), _obj), _applyDecoratedDescriptor(_obj, "save", [_object.action], Object.getOwnPropertyDescriptor(_obj, "save"), _obj)), _obj)));
  _exports.default = _default;
});