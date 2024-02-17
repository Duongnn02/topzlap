define("discourse/controllers/groups-new", ["exports", "@ember/controller", "I18n", "@ember/object", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse-common/utils/decorators", "@ember/service"], function (_exports, _controller, _I18n, _object, _ajax, _ajaxError, _decorators, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.popupAutomaticMembershipAlert = popupAutomaticMembershipAlert;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function popupAutomaticMembershipAlert(group_id, email_domains) {
    if (!email_domains) {
      return;
    }
    const data = {};
    data.automatic_membership_email_domains = email_domains;
    if (group_id) {
      data.id = group_id;
    }
    (0, _ajax.ajax)(`/admin/groups/automatic_membership_count.json`, {
      type: "PUT",
      data
    }).then(result => {
      const count = result.user_count;
      if (count > 0) {
        this.dialog.alert(_I18n.default.t("admin.groups.manage.membership.automatic_membership_user_count", {
          count
        }));
      }
    });
  }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("model.ownerUsernames"), _dec2 = (0, _decorators.default)("model.usernames"), (_obj = {
    dialog: (0, _service.inject)(),
    saving: null,
    splitOwnerUsernames(owners) {
      return owners && owners.length ? owners.split(",") : [];
    },
    splitUsernames(usernames) {
      return usernames && usernames.length ? usernames.split(",") : [];
    },
    save() {
      this.set("saving", true);
      const group = this.model;
      popupAutomaticMembershipAlert(group.id, group.automatic_membership_email_domains);
      group.create().then(() => {
        this.transitionToRoute("group.members", group.name);
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("saving", false));
    },
    updateOwnerUsernames(selected) {
      this.set("model.ownerUsernames", selected.join(","));
    },
    updateUsernames(selected) {
      this.set("model.usernames", selected.join(","));
    }
  }, (_applyDecoratedDescriptor(_obj, "splitOwnerUsernames", [_dec], Object.getOwnPropertyDescriptor(_obj, "splitOwnerUsernames"), _obj), _applyDecoratedDescriptor(_obj, "splitUsernames", [_dec2], Object.getOwnPropertyDescriptor(_obj, "splitUsernames"), _obj), _applyDecoratedDescriptor(_obj, "save", [_object.action], Object.getOwnPropertyDescriptor(_obj, "save"), _obj), _applyDecoratedDescriptor(_obj, "updateOwnerUsernames", [_object.action], Object.getOwnPropertyDescriptor(_obj, "updateOwnerUsernames"), _obj), _applyDecoratedDescriptor(_obj, "updateUsernames", [_object.action], Object.getOwnPropertyDescriptor(_obj, "updateUsernames"), _obj)), _obj)));
  _exports.default = _default;
});