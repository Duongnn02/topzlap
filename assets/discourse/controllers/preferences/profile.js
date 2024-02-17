define("discourse/controllers/preferences/profile", ["exports", "@ember/controller", "@ember/object", "I18n", "discourse/lib/ajax", "discourse/lib/text", "discourse-common/utils/decorators", "@ember/utils", "discourse/lib/ajax-error", "@ember/object/computed", "discourse/lib/show-modal", "@ember/service"], function (_exports, _controller, _object, _I18n, _ajax, _text, _decorators, _utils, _ajaxError, _computed, _showModal, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/text",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"@ember/object/computed",0,"discourse/lib/show-modal",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.user_fields.@each.value"), _dec2 = (0, _decorators.default)("model.user_option.default_calendar"), (_obj = {
    dialog: (0, _service.inject)(),
    subpageTitle: _I18n.default.t("user.preferences_nav.profile"),
    init() {
      this._super(...arguments);
      this.saveAttrNames = ["bio_raw", "website", "location", "custom_fields", "user_fields", "profile_background_upload_url", "card_background_upload_url", "date_of_birth", "timezone", "default_calendar"];
      this.calendarOptions = [{
        name: _I18n.default.t("download_calendar.google"),
        value: "google"
      }, {
        name: _I18n.default.t("download_calendar.ics"),
        value: "ics"
      }];
    },
    userFields() {
      let siteUserFields = this.site.user_fields;
      if ((0, _utils.isEmpty)(siteUserFields)) {
        return;
      }

      // Staff can edit fields that are not `editable`
      if (!this.currentUser.staff) {
        siteUserFields = siteUserFields.filterBy("editable", true);
      }
      return siteUserFields.sortBy("position").map(field => {
        const value = this.model.user_fields?.[field.id.toString()];
        return _object.default.create({
          field,
          value
        });
      });
    },
    canChangeDefaultCalendar(defaultCalendar) {
      return defaultCalendar !== "none_selected";
    },
    canChangeBio: (0, _computed.readOnly)("model.can_change_bio"),
    canChangeLocation: (0, _computed.readOnly)("model.can_change_location"),
    canChangeWebsite: (0, _computed.readOnly)("model.can_change_website"),
    canUploadProfileHeader: (0, _computed.readOnly)("model.can_upload_profile_header"),
    canUploadUserCardBackground: (0, _computed.readOnly)("model.can_upload_user_card_background"),
    actions: {
      showFeaturedTopicModal() {
        const modal = (0, _showModal.default)("feature-topic-on-profile", {
          model: this.model,
          title: "user.feature_topic_on_profile.title"
        });
        modal.set("onClose", () => {
          document.querySelector(".feature-topic-on-profile-btn")?.focus();
        });
      },
      clearFeaturedTopicFromProfile() {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("user.feature_topic_on_profile.clear.warning"),
          didConfirm: () => {
            return (0, _ajax.ajax)(`/u/${this.model.username}/clear-featured-topic`, {
              type: "PUT"
            }).then(() => {
              this.model.set("featured_topic", null);
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      },
      useCurrentTimezone() {
        this.model.set("user_option.timezone", moment.tz.guess());
      },
      _updateUserFields() {
        const model = this.model,
          userFields = this.userFields;
        if (!(0, _utils.isEmpty)(userFields)) {
          const modelFields = model.get("user_fields");
          if (!(0, _utils.isEmpty)(modelFields)) {
            userFields.forEach(function (uf) {
              const value = uf.get("value");
              modelFields[uf.get("field.id").toString()] = (0, _utils.isEmpty)(value) ? null : value;
            });
          }
        }
      },
      save() {
        this.set("saved", false);
        const model = this.model;

        // Update the user fields
        this.send("_updateUserFields");
        return model.save(this.saveAttrNames).then(() => {
          (0, _text.cookAsync)(model.get("bio_raw")).then(() => {
            model.set("bio_cooked");
            this.set("saved", true);
          }).catch(_ajaxError.popupAjaxError);
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "userFields", [_dec], Object.getOwnPropertyDescriptor(_obj, "userFields"), _obj), _applyDecoratedDescriptor(_obj, "canChangeDefaultCalendar", [_dec2], Object.getOwnPropertyDescriptor(_obj, "canChangeDefaultCalendar"), _obj)), _obj)));
  _exports.default = _default;
});