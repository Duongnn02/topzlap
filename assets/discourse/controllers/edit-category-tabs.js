define("discourse/controllers/edit-category-tabs", ["exports", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/models/category", "@ember/controller", "discourse/lib/url", "I18n", "discourse/lib/notification-levels", "discourse/models/permission-type", "discourse/lib/ajax-error", "@ember/string", "@ember/service"], function (_exports, _computed, _decorators, _category, _controller, _url, _I18n, _notificationLevels, _permissionType, _ajaxError, _string, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/models/category",0,"@ember/controller",0,"discourse/lib/url",0,"I18n",0,"discourse/lib/notification-levels",0,"discourse/models/permission-type",0,"discourse/lib/ajax-error",0,"@ember/string",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("saving", "model.name", "model.color", "deleting"), _dec3 = (0, _decorators.default)("saving", "deleting"), _dec4 = (0, _decorators.default)("name"), _dec5 = (0, _decorators.default)("saving", "model.id"), _dec6 = (0, _decorators.default)("model.id", "model.name"), _dec7 = (0, _decorators.default)("selectedTab"), (_obj = {
    dialog: (0, _service.inject)(),
    selectedTab: "general",
    saving: false,
    deleting: false,
    panels: null,
    showTooltip: false,
    createdCategory: false,
    expandedMenu: false,
    mobileView: (0, _computed.readOnly)("site.mobileView"),
    parentParams: null,
    showDeleteReason: (0, _computed.and)("showTooltip", "model.cannot_delete_reason"),
    _initPanels() {
      this.setProperties({
        panels: [],
        validators: []
      });
    },
    disabled(saving, name, color, deleting) {
      if (saving || deleting) {
        return true;
      }
      if (!name) {
        return true;
      }
      if (!color) {
        return true;
      }
      return false;
    },
    deleteDisabled(saving, deleting) {
      return deleting || saving || false;
    },
    categoryName(name) {
      name = name || "";
      return name.trim().length > 0 ? name : _I18n.default.t("preview");
    },
    saveLabel(saving, id) {
      if (saving) {
        return "saving";
      }
      return id ? "category.save" : "category.create";
    },
    title(id, name) {
      return id ? _I18n.default.t("category.edit_dialog_title", {
        categoryName: name
      }) : _I18n.default.t("category.create");
    },
    selectedTabTitle(tab) {
      return _I18n.default.t(`category.${(0, _string.underscore)(tab)}`);
    },
    actions: {
      registerValidator(validator) {
        this.validators.push(validator);
      },
      saveCategory() {
        if (this.validators.some(validator => validator())) {
          return;
        }
        const model = this.model;
        const parentCategory = this.site.categories.findBy("id", parseInt(model.parent_category_id, 10));
        this.set("saving", true);
        model.set("parentCategory", parentCategory);
        model.save().then(result => {
          this.set("saving", false);
          if (!model.id) {
            model.setProperties({
              slug: result.category.slug,
              id: result.category.id,
              can_edit: result.category.can_edit,
              permission: _permissionType.default.FULL,
              notification_level: _notificationLevels.NotificationLevels.REGULAR
            });
            this.site.updateCategory(model);
            this.transitionToRoute("editCategory", _category.default.slugFor(model));
          }
        }).catch(error => {
          (0, _ajaxError.popupAjaxError)(error);
          this.set("saving", false);
        });
      },
      deleteCategory() {
        this.set("deleting", true);
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("category.delete_confirm"),
          didConfirm: () => {
            this.model.destroy().then(() => {
              this.transitionToRoute("discovery.categories");
            }).catch(() => {
              this.displayErrors([_I18n.default.t("category.delete_error")]);
            }).finally(() => {
              this.set("deleting", false);
            });
          },
          didCancel: () => this.set("deleting", false)
        });
      },
      toggleDeleteTooltip() {
        this.toggleProperty("showTooltip");
      },
      goBack() {
        _url.default.routeTo(this.model.url);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_initPanels", [_dec], Object.getOwnPropertyDescriptor(_obj, "_initPanels"), _obj), _applyDecoratedDescriptor(_obj, "disabled", [_dec2], Object.getOwnPropertyDescriptor(_obj, "disabled"), _obj), _applyDecoratedDescriptor(_obj, "deleteDisabled", [_dec3], Object.getOwnPropertyDescriptor(_obj, "deleteDisabled"), _obj), _applyDecoratedDescriptor(_obj, "categoryName", [_dec4], Object.getOwnPropertyDescriptor(_obj, "categoryName"), _obj), _applyDecoratedDescriptor(_obj, "saveLabel", [_dec5], Object.getOwnPropertyDescriptor(_obj, "saveLabel"), _obj), _applyDecoratedDescriptor(_obj, "title", [_dec6], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "selectedTabTitle", [_dec7], Object.getOwnPropertyDescriptor(_obj, "selectedTabTitle"), _obj)), _obj)));
  _exports.default = _default;
});