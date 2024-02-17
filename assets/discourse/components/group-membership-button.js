define("discourse/components/group-membership-button", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse/lib/cookie", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "@ember/service", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _I18n, _cookie, _decorators, _ajaxError, _service, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse/lib/cookie",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"@ember/service",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canJoinGroup}}
    <DButton
      @action={{action "joinGroup"}}
      @class="btn-default group-index-join"
      @icon="user-plus"
      @label="groups.join"
      @disabled={{this.updatingMembership}}
    />
  {{else if this.canLeaveGroup}}
    <DButton
      @action={{action "leaveGroup"}}
      @class="btn-danger group-index-leave"
      @icon="user-times"
      @label="groups.leave"
      @disabled={{this.updatingMembership}}
    />
  {{else if this.canRequestMembership}}
    <DButton
      @action={{action "showRequestMembershipForm"}}
      @class="btn-default group-index-request"
      @disabled={{this.loading}}
      @icon="user-plus"
      @label="groups.request"
    />
  {{else}}
    {{yield}}
  {{/if}}
  */
  {
    "id": "K2YBCCL3",
    "block": "[[[41,[30,0,[\"canJoinGroup\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@icon\",\"@label\",\"@disabled\"],[[28,[37,2],[[30,0],\"joinGroup\"],null],\"btn-default group-index-join\",\"user-plus\",\"groups.join\",[30,0,[\"updatingMembership\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"canLeaveGroup\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@icon\",\"@label\",\"@disabled\"],[[28,[37,2],[[30,0],\"leaveGroup\"],null],\"btn-danger group-index-leave\",\"user-times\",\"groups.leave\",[30,0,[\"updatingMembership\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"canRequestMembership\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@disabled\",\"@icon\",\"@label\"],[[28,[37,2],[[30,0],\"showRequestMembershipForm\"],null],\"btn-default group-index-request\",[30,0,[\"loading\"]],\"user-plus\",\"groups.request\"]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[18,1,null],[1,\"\\n\"]],[]]]],[]]]],[]]]],[\"&default\"],false,[\"if\",\"d-button\",\"action\",\"yield\"]]",
    "moduleName": "discourse/components/group-membership-button.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.public_admission", "userIsGroupUser"), _dec2 = (0, _decorators.default)("model.public_exit", "userIsGroupUser"), _dec3 = (0, _decorators.default)("model.allow_membership_requests", "userIsGroupUser"), _dec4 = (0, _decorators.default)("model.is_group_user"), (_obj = {
    classNames: ["group-membership-button"],
    dialog: (0, _service.inject)(),
    canJoinGroup(publicAdmission, userIsGroupUser) {
      return publicAdmission && !userIsGroupUser;
    },
    canLeaveGroup(publicExit, userIsGroupUser) {
      return publicExit && userIsGroupUser;
    },
    canRequestMembership(allowMembershipRequests, userIsGroupUser) {
      return allowMembershipRequests && !userIsGroupUser;
    },
    userIsGroupUser(isGroupUser) {
      return !!isGroupUser;
    },
    _showLoginModal() {
      this.showLogin();
      (0, _cookie.default)("destination_url", window.location.href);
    },
    removeFromGroup() {
      const model = this.model;
      model.leave().then(() => {
        model.set("is_group_user", false);
        this.appEvents.trigger("group:leave", model);
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("updatingMembership", false));
    },
    actions: {
      joinGroup() {
        if (this.currentUser) {
          this.set("updatingMembership", true);
          const group = this.model;
          group.join().then(() => {
            group.set("is_group_user", true);
            this.appEvents.trigger("group:join", group);
          }).catch(_ajaxError.popupAjaxError).finally(() => {
            this.set("updatingMembership", false);
          });
        } else {
          this._showLoginModal();
        }
      },
      leaveGroup() {
        this.set("updatingMembership", true);
        if (this.model.public_admission) {
          this.removeFromGroup();
        } else {
          return this.dialog.yesNoConfirm({
            message: _I18n.default.t("groups.confirm_leave"),
            didConfirm: () => this.removeFromGroup(),
            didCancel: () => this.set("updatingMembership", false)
          });
        }
      },
      showRequestMembershipForm() {
        if (this.currentUser) {
          (0, _showModal.default)("request-group-membership-form", {
            model: this.model
          });
        } else {
          this._showLoginModal();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "canJoinGroup", [_dec], Object.getOwnPropertyDescriptor(_obj, "canJoinGroup"), _obj), _applyDecoratedDescriptor(_obj, "canLeaveGroup", [_dec2], Object.getOwnPropertyDescriptor(_obj, "canLeaveGroup"), _obj), _applyDecoratedDescriptor(_obj, "canRequestMembership", [_dec3], Object.getOwnPropertyDescriptor(_obj, "canRequestMembership"), _obj), _applyDecoratedDescriptor(_obj, "userIsGroupUser", [_dec4], Object.getOwnPropertyDescriptor(_obj, "userIsGroupUser"), _obj)), _obj))));
  _exports.default = _default;
});