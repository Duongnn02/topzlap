define("discourse/controllers/avatar-selector", ["exports", "@ember/controller", "@ember/object", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/lib/uploads", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/lib/computed", "discourse-common/config/environment", "@ember/object/compat", "@glimmer/tracking"], function (_exports, _controller, _object, _modalFunctionality, _ajax, _uploads, _decorators, _ajaxError, _computed, _environment, _compat, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/lib/uploads",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/lib/computed",0,"discourse-common/config/environment",0,"@ember/object/compat",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("selected", "uploading"), _dec2 = (0, _decorators.default)("siteSettings.selectable_avatars_mode", "siteSettings.selectable_avatars"), _dec3 = (0, _decorators.default)("siteSettings.selectable_avatars_mode"), _dec4 = (0, _decorators.default)("siteSettings.selectable_avatars_mode"), _dec5 = (0, _decorators.default)("selected", "user.system_avatar_upload_id", "user.gravatar_avatar_upload_id", "user.custom_avatar_upload_id"), _dec6 = (0, _decorators.default)("selected", "user.system_avatar_template", "user.gravatar_avatar_template", "user.custom_avatar_template"), _dec7 = (0, _decorators.default)("siteSettings.allow_uploaded_avatars"), (_obj = {
    gravatarName: (0, _computed.setting)("gravatar_name"),
    gravatarBaseUrl: (0, _computed.setting)("gravatar_base_url"),
    gravatarLoginUrl: (0, _computed.setting)("gravatar_login_url"),
    submitDisabled(selected, uploading) {
      return selected === "logo" || uploading;
    },
    selectableAvatars(mode, list) {
      if (mode !== "disabled") {
        return list ? list.split("|") : [];
      }
    },
    showSelectableAvatars(mode) {
      return mode !== "disabled";
    },
    showAvatarUploader(mode) {
      switch (mode) {
        case "no_one":
          return false;
        case "tl1":
        case "tl2":
        case "tl3":
        case "tl4":
          const allowedTl = parseInt(mode.replace("tl", ""), 10);
          return this.user.admin || this.user.moderator || this.user.trust_level >= allowedTl;
        case "staff":
          return this.user.admin || this.user.moderator;
        case "everyone":
        default:
          return true;
      }
    },
    _selected: null,
    get selected() {
      return this._selected ?? this.defaultSelection;
    },
    set selected(value) {
      this._selected = value;
    },
    onSelectedChanged(value) {
      this._selected = value;
    },
    get defaultSelection() {
      if (this.get("user.use_logo_small_as_avatar")) {
        return "logo";
      } else if (this.get("user.avatar_template") === this.get("user.system_avatar_template")) {
        return "system";
      } else if (this.get("user.avatar_template") === this.get("user.gravatar_avatar_template")) {
        return "gravatar";
      } else {
        return "custom";
      }
    },
    selectedUploadId(selected, system, gravatar, custom) {
      switch (selected) {
        case "system":
          return system;
        case "gravatar":
          return gravatar;
        default:
          return custom;
      }
    },
    selectedAvatarTemplate(selected, system, gravatar, custom) {
      switch (selected) {
        case "system":
          return system;
        case "gravatar":
          return gravatar;
        default:
          return custom;
      }
    },
    siteSettingMatches(value, user) {
      switch (value) {
        case "disabled":
          return false;
        case "staff":
          return user.staff;
        case "admin":
          return user.admin;
        default:
          return user.trust_level >= parseInt(value, 10) || user.staff;
      }
    },
    allowAvatarUpload(allowUploadedAvatars) {
      return this.siteSettingMatches(allowUploadedAvatars, this.currentUser) && (0, _uploads.allowsImages)(this.currentUser.staff, this.siteSettings);
    },
    selectAvatar(url, event) {
      event?.preventDefault();
      this.user.selectAvatar(url).then(() => window.location.reload()).catch(_ajaxError.popupAjaxError);
    },
    actions: {
      uploadComplete() {
        this.set("selected", "custom");
      },
      refreshGravatar() {
        this.set("gravatarRefreshDisabled", true);
        return (0, _ajax.ajax)(`/user_avatar/${this.get("user.username")}/refresh_gravatar.json`, {
          type: "POST"
        }).then(result => {
          if (!result.gravatar_upload_id) {
            this.set("gravatarFailed", true);
          } else {
            this.set("gravatarFailed", false);
            this.user.setProperties({
              gravatar_avatar_upload_id: result.gravatar_upload_id,
              gravatar_avatar_template: result.gravatar_avatar_template
            });
          }
        }).finally(() => this.set("gravatarRefreshDisabled", false));
      },
      saveAvatarSelection() {
        const selectedUploadId = this.selectedUploadId;
        const type = this.selected;
        this.user.pickAvatar(selectedUploadId, type).then(() => {
          if (!(0, _environment.isTesting)()) {
            window.location.reload();
          }
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj), _applyDecoratedDescriptor(_obj, "selectableAvatars", [_dec2], Object.getOwnPropertyDescriptor(_obj, "selectableAvatars"), _obj), _applyDecoratedDescriptor(_obj, "showSelectableAvatars", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showSelectableAvatars"), _obj), _applyDecoratedDescriptor(_obj, "showAvatarUploader", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showAvatarUploader"), _obj), _applyDecoratedDescriptor(_obj, "_selected", [_tracking.tracked], (_init = Object.getOwnPropertyDescriptor(_obj, "_selected"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "selected", [_compat.dependentKeyCompat], Object.getOwnPropertyDescriptor(_obj, "selected"), _obj), _applyDecoratedDescriptor(_obj, "onSelectedChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onSelectedChanged"), _obj), _applyDecoratedDescriptor(_obj, "selectedUploadId", [_dec5], Object.getOwnPropertyDescriptor(_obj, "selectedUploadId"), _obj), _applyDecoratedDescriptor(_obj, "selectedAvatarTemplate", [_dec6], Object.getOwnPropertyDescriptor(_obj, "selectedAvatarTemplate"), _obj), _applyDecoratedDescriptor(_obj, "allowAvatarUpload", [_dec7], Object.getOwnPropertyDescriptor(_obj, "allowAvatarUpload"), _obj), _applyDecoratedDescriptor(_obj, "selectAvatar", [_object.action], Object.getOwnPropertyDescriptor(_obj, "selectAvatar"), _obj)), _obj)));
  _exports.default = _default;
});