define("discourse/components/group-manage-save-button", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/controllers/groups-new", "discourse/lib/show-modal", "@ember/object/computed"], function (_exports, _component, _templateFactory, _I18n, _decorators, _ajaxError, _groupsNew, _showModal, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/controllers/groups-new",0,"discourse/lib/show-modal",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.privateGroupNameNotice}}
    <div class="row">
      <div class="alert alert-warning alert-private-group-name">
        {{this.privateGroupNameNotice}}
      </div>
    </div>
  {{/if}}
  <div class="control-group buttons group-manage-save-button">
    <DButton
      @action={{action "save"}}
      @disabled={{or this.disabled this.saving}}
      @class="btn btn-primary group-manage-save"
      @translatedLabel={{this.savingText}}
    />
    {{#if this.saved}}
      <span>{{i18n "saved"}}</span>
    {{/if}}
  </div>
  */
  {
    "id": "7X1p6C+t",
    "block": "[[[41,[30,0,[\"privateGroupNameNotice\"]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"alert alert-warning alert-private-group-name\"],[12],[1,\"\\n      \"],[1,[30,0,[\"privateGroupNameNotice\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[10,0],[14,0,\"control-group buttons group-manage-save-button\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@action\",\"@disabled\",\"@class\",\"@translatedLabel\"],[[28,[37,2],[[30,0],\"save\"],null],[28,[37,3],[[30,0,[\"disabled\"]],[30,0,[\"saving\"]]],null],\"btn btn-primary group-manage-save\",[30,0,[\"savingText\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"saved\"]],[[[1,\"    \"],[10,1],[12],[1,[28,[35,4],[\"saved\"],null]],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"if\",\"d-button\",\"action\",\"or\",\"i18n\"]]",
    "moduleName": "discourse/components/group-manage-save-button.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("saving"), _dec2 = (0, _decorators.default)("model.visibility_level", "model.primary_group", "hasFlair"), (_obj = {
    saving: null,
    disabled: false,
    updateExistingUsers: null,
    hasFlair: (0, _computed.or)("model.flair_icon", "model.flair_upload_id"),
    savingText(saving) {
      return saving ? _I18n.default.t("saving") : _I18n.default.t("save");
    },
    privateGroupNameNotice(visibilityLevel, isPrimaryGroup, hasFlair) {
      if (visibilityLevel === 0) {
        return;
      }
      if (isPrimaryGroup) {
        return _I18n.default.t("admin.groups.manage.alert.primary_group", {
          group_name: this.model.name
        });
      } else if (hasFlair) {
        return _I18n.default.t("admin.groups.manage.alert.flair_group", {
          group_name: this.model.name
        });
      }
    },
    actions: {
      save() {
        if (this.beforeSave) {
          this.beforeSave();
        }
        this.set("saving", true);
        const group = this.model;
        (0, _groupsNew.popupAutomaticMembershipAlert)(group.id, group.automatic_membership_email_domains);
        const opts = {};
        if (this.updateExistingUsers !== null) {
          opts.update_existing_users = this.updateExistingUsers;
        }
        return group.save(opts).then(() => {
          this.setProperties({
            saved: true,
            updateExistingUsers: null
          });
          if (this.afterSave) {
            this.afterSave();
          }
        }).catch(error => {
          const json = error.jqXHR.responseJSON;
          if (error.jqXHR.status === 422 && json.user_count) {
            const controller = (0, _showModal.default)("group-default-notifications", {
              model: {
                count: json.user_count
              }
            });
            controller.set("onClose", () => {
              this.updateExistingUsers = controller.updateExistingUsers;
              this.send("save");
            });
          } else {
            (0, _ajaxError.popupAjaxError)(error);
          }
        }).finally(() => this.set("saving", false));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "savingText", [_dec], Object.getOwnPropertyDescriptor(_obj, "savingText"), _obj), _applyDecoratedDescriptor(_obj, "privateGroupNameNotice", [_dec2], Object.getOwnPropertyDescriptor(_obj, "privateGroupNameNotice"), _obj)), _obj))));
  _exports.default = _default;
});