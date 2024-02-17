define("discourse/controllers/group", ["exports", "@ember/controller", "@ember/object", "I18n", "discourse-common/utils/decorators", "@ember/string", "@ember/service", "discourse/components/dialog-messages/group-delete"], function (_exports, _controller, _object, _I18n, _decorators, _string, _service, _groupDelete) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/string",0,"@ember/service",0,"discourse/components/dialog-messages/group-delete"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const Tab = _object.default.extend({
    init() {
      this._super(...arguments);
      this.setProperties({
        route: this.route || `group.${this.name}`,
        message: _I18n.default.t(`groups.${this.i18nKey || this.name}`)
      });
    }
  });
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("showMessages", "model.user_count", "model.request_count", "canManageGroup", "model.allow_membership_requests"), _dec2 = (0, _decorators.default)("model.has_messages", "model.is_group_user", "currentUser.can_send_private_messages"), _dec3 = (0, _decorators.default)("model.displayName", "model.full_name"), _dec4 = (0, _decorators.default)("model.messageable"), _dec5 = (0, _decorators.default)("model", "model.automatic"), (_obj = {
    application: (0, _controller.inject)(),
    dialog: (0, _service.inject)(),
    counts: null,
    showing: "members",
    destroying: null,
    showTooltip: false,
    tabs(showMessages, userCount, requestCount, canManageGroup, allowMembershipRequests) {
      const membersTab = Tab.create({
        name: "members",
        route: "group.index",
        icon: "users",
        i18nKey: "members.title",
        count: userCount
      });
      const defaultTabs = [membersTab, Tab.create({
        name: "activity"
      })];
      if (canManageGroup && allowMembershipRequests) {
        defaultTabs.push(Tab.create({
          name: "requests",
          i18nKey: "requests.title",
          icon: "user-plus",
          count: requestCount
        }));
      }
      if (showMessages) {
        defaultTabs.push(Tab.create({
          name: "messages",
          i18nKey: "messages"
        }));
      }
      if (canManageGroup) {
        defaultTabs.push(Tab.create({
          name: "manage",
          i18nKey: "manage.title",
          icon: "wrench"
        }));
      }
      defaultTabs.push(Tab.create({
        name: "permissions",
        i18nKey: "permissions.title"
      }));
      return defaultTabs;
    },
    showMessages(hasMessages, isGroupUser) {
      if (!this.currentUser?.can_send_private_messages) {
        return false;
      }
      if (!hasMessages) {
        return false;
      }
      return isGroupUser || this.currentUser && this.currentUser.admin;
    },
    groupName(displayName, fullName) {
      return (0, _string.capitalize)(fullName || displayName);
    },
    displayGroupMessageButton(messageable) {
      return this.currentUser && messageable;
    },
    canManageGroup(model, automatic) {
      return this.currentUser && (this.currentUser.canManageGroup(model) || model.can_admin_group && automatic);
    },
    messageGroup() {
      this.send("createNewMessageViaParams", {
        recipients: this.get("model.name"),
        hasGroups: true
      });
    },
    destroyGroup() {
      this.set("destroying", true);
      const model = this.model;
      this.dialog.deleteConfirm({
        title: _I18n.default.t("admin.groups.delete_confirm", {
          group: model.name
        }),
        bodyComponent: _groupDelete.default,
        bodyComponentModel: model,
        didConfirm: () => {
          model.destroy().then(() => this.transitionToRoute("groups.index")).catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
            this.dialog.alert(_I18n.default.t("admin.groups.delete_failed"));
          }).finally(() => this.set("destroying", false));
        },
        didCancel: () => this.set("destroying", false)
      });
    },
    toggleDeleteTooltip() {
      this.toggleProperty("showTooltip");
    }
  }, (_applyDecoratedDescriptor(_obj, "tabs", [_dec], Object.getOwnPropertyDescriptor(_obj, "tabs"), _obj), _applyDecoratedDescriptor(_obj, "showMessages", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showMessages"), _obj), _applyDecoratedDescriptor(_obj, "groupName", [_dec3], Object.getOwnPropertyDescriptor(_obj, "groupName"), _obj), _applyDecoratedDescriptor(_obj, "displayGroupMessageButton", [_dec4], Object.getOwnPropertyDescriptor(_obj, "displayGroupMessageButton"), _obj), _applyDecoratedDescriptor(_obj, "canManageGroup", [_dec5], Object.getOwnPropertyDescriptor(_obj, "canManageGroup"), _obj), _applyDecoratedDescriptor(_obj, "messageGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "messageGroup"), _obj), _applyDecoratedDescriptor(_obj, "destroyGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "destroyGroup"), _obj), _applyDecoratedDescriptor(_obj, "toggleDeleteTooltip", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleDeleteTooltip"), _obj)), _obj)));
  _exports.default = _default;
});