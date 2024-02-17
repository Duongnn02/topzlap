define("discourse/components/groups-form-membership-fields", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/models/associated-group"], function (_exports, _component, _templateFactory, _I18n, _object, _computed, _decorators, _associatedGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/models/associated-group"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group">
    <label class="control-label">{{i18n
        "groups.manage.membership.access"
      }}</label>
  
    <label>
      <Input
        @type="checkbox"
        class="group-form-public-admission"
        @checked={{this.model.public_admission}}
        disabled={{this.disablePublicSetting}}
      />
  
      {{i18n "groups.public_admission"}}
    </label>
  
    <label>
      <Input
        @type="checkbox"
        class="group-form-public-exit"
        @checked={{this.model.public_exit}}
      />
  
      {{i18n "groups.public_exit"}}
    </label>
  
    <label>
      <Input
        @type="checkbox"
        class="group-form-allow-membership-requests"
        @checked={{this.model.allow_membership_requests}}
        disabled={{this.disableMembershipRequestSetting}}
      />
  
      {{i18n "groups.allow_membership_requests"}}
    </label>
  
    {{#if this.model.allow_membership_requests}}
      <div>
        <label for="membership-request-template">
          {{i18n "groups.membership_request_template"}}
        </label>
  
        <ExpandingTextArea
          @name="membership-request-template"
          @class="group-form-membership-request-template input-xxlarge"
          @value={{this.model.membership_request_template}}
        />
      </div>
    {{/if}}
  </div>
  
  {{#if this.model.can_admin_group}}
    <div class="control-group">
      <label class="control-label">{{i18n
          "admin.groups.manage.membership.automatic"
        }}</label>
  
      <label for="automatic_membership">
        {{i18n
          "admin.groups.manage.membership.automatic_membership_email_domains"
        }}
      </label>
  
      <ListSetting
        @name="automatic_membership"
        @class="group-form-automatic-membership-automatic"
        @value={{this.emailDomains}}
        @choices={{this.emailDomains}}
        @settingName="name"
        @nameProperty={{null}}
        @valueProperty={{null}}
        @onChange={{action "onChangeEmailDomainsSetting"}}
        @options={{hash allowAny=true}}
      />
  
      {{#if this.showAssociatedGroups}}
        <label for="automatic_membership_associated_groups">
          {{i18n
            "admin.groups.manage.membership.automatic_membership_associated_groups"
          }}
        </label>
  
        <ListSetting
          @name="automatic_membership_associated_groups"
          @class="group-form-automatic-membership-associated-groups"
          @value={{this.model.associatedGroupIds}}
          @choices={{this.associatedGroups}}
          @settingName="name"
          @nameProperty="label"
          @valueProperty="id"
          @onChange={{action (mut this.model.associated_group_ids)}}
        />
      {{/if}}
    </div>
  
    <span>
      <PluginOutlet
        @name="groups-form-membership-below-automatic"
        @connectorTagName="div"
        @outletArgs={{hash model=this.model}}
      />
    </span>
  
    <div class="control-group">
      <label class="control-label">{{i18n
          "admin.groups.manage.membership.effects"
        }}</label>
      <label for="grant_trust_level">{{i18n
          "admin.groups.manage.membership.trust_levels_title"
        }}</label>
  
      <ComboBox
        @name="grant_trust_level"
        @valueProperty="value"
        @value={{this.groupTrustLevel}}
        @content={{this.trustLevelOptions}}
        @class="groups-form-grant-trust-level"
        @onChange={{action (mut this.model.grant_trust_level)}}
      />
      <label>
        <Input
          @type="checkbox"
          @checked={{this.model.primary_group}}
          class="groups-form-primary-group"
        />
  
        {{i18n "admin.groups.manage.membership.primary_group"}}
      </label>
    </div>
  
    <div class="control-group">
      <label class="control-label" for="title">
        {{i18n "admin.groups.default_title"}}
      </label>
  
      <Input @value={{this.model.title}} name="title" class="input-xxlarge" />
  
      <div class="control-instructions">
        {{i18n "admin.groups.default_title_description"}}
      </div>
    </div>
  {{/if}}
  
  {{#if this.canEdit}}
    <div class="control-group">
      <GroupFlairInputs @model={{this.model}} />
    </div>
  {{/if}}
  */
  {
    "id": "JR2tMCfa",
    "block": "[[[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"groups.manage.membership.access\"],null]],[13],[1,\"\\n\\n  \"],[10,\"label\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"group-form-public-admission\"],[16,\"disabled\",[30,0,[\"disablePublicSetting\"]]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"public_admission\"]]]],null],[1,\"\\n\\n    \"],[1,[28,[35,0],[\"groups.public_admission\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"label\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"group-form-public-exit\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"public_exit\"]]]],null],[1,\"\\n\\n    \"],[1,[28,[35,0],[\"groups.public_exit\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"label\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"group-form-allow-membership-requests\"],[16,\"disabled\",[30,0,[\"disableMembershipRequestSetting\"]]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"allow_membership_requests\"]]]],null],[1,\"\\n\\n    \"],[1,[28,[35,0],[\"groups.allow_membership_requests\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"allow_membership_requests\"]],[[[1,\"    \"],[10,0],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"membership-request-template\"],[12],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.membership_request_template\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,3],null,[[\"@name\",\"@class\",\"@value\"],[\"membership-request-template\",\"group-form-membership-request-template input-xxlarge\",[30,0,[\"model\",\"membership_request_template\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"can_admin_group\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"admin.groups.manage.membership.automatic\"],null]],[13],[1,\"\\n\\n    \"],[10,\"label\"],[14,\"for\",\"automatic_membership\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.groups.manage.membership.automatic_membership_email_domains\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@name\",\"@class\",\"@value\",\"@choices\",\"@settingName\",\"@nameProperty\",\"@valueProperty\",\"@onChange\",\"@options\"],[\"automatic_membership\",\"group-form-automatic-membership-automatic\",[30,0,[\"emailDomains\"]],[30,0,[\"emailDomains\"]],\"name\",null,null,[28,[37,5],[[30,0],\"onChangeEmailDomainsSetting\"],null],[28,[37,6],null,[[\"allowAny\"],[true]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showAssociatedGroups\"]],[[[1,\"      \"],[10,\"label\"],[14,\"for\",\"automatic_membership_associated_groups\"],[12],[1,\"\\n        \"],[1,[28,[35,0],[\"admin.groups.manage.membership.automatic_membership_associated_groups\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,4],null,[[\"@name\",\"@class\",\"@value\",\"@choices\",\"@settingName\",\"@nameProperty\",\"@valueProperty\",\"@onChange\"],[\"automatic_membership_associated_groups\",\"group-form-automatic-membership-associated-groups\",[30,0,[\"model\",\"associatedGroupIds\"]],[30,0,[\"associatedGroups\"]],\"name\",\"label\",\"id\",[28,[37,5],[[30,0],[28,[37,7],[[30,0,[\"model\",\"associated_group_ids\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"groups-form-membership-below-automatic\",\"div\",[28,[37,6],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"admin.groups.manage.membership.effects\"],null]],[13],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"grant_trust_level\"],[12],[1,[28,[35,0],[\"admin.groups.manage.membership.trust_levels_title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,9],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\"],[\"grant_trust_level\",\"value\",[30,0,[\"groupTrustLevel\"]],[30,0,[\"trustLevelOptions\"]],\"groups-form-grant-trust-level\",[28,[37,5],[[30,0],[28,[37,7],[[30,0,[\"model\",\"grant_trust_level\"]]],null]],null]]],null],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,1],[[24,0,\"groups-form-primary-group\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"primary_group\"]]]],null],[1,\"\\n\\n      \"],[1,[28,[35,0],[\"admin.groups.manage.membership.primary_group\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"title\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.groups.default_title\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,1],[[24,3,\"title\"],[24,0,\"input-xxlarge\"]],[[\"@value\"],[[30,0,[\"model\",\"title\"]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.groups.default_title_description\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canEdit\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,10],null,[[\"@model\"],[[30,0,[\"model\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"i18n\",\"input\",\"if\",\"expanding-text-area\",\"list-setting\",\"action\",\"hash\",\"mut\",\"plugin-outlet\",\"combo-box\",\"group-flair-inputs\"]]",
    "moduleName": "discourse/components/groups-form-membership-fields.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.visibility_level", "model.public_admission"), _dec2 = (0, _decorators.default)("model.visibility_level", "model.allow_membership_requests"), (_obj = {
    tokenSeparator: "|",
    showAssociatedGroups: (0, _computed.readOnly)("site.can_associate_groups"),
    init() {
      this._super(...arguments);
      this.trustLevelOptions = [{
        name: _I18n.default.t("admin.groups.manage.membership.trust_levels_none"),
        value: 0
      }, {
        name: 1,
        value: 1
      }, {
        name: 2,
        value: 2
      }, {
        name: 3,
        value: 3
      }, {
        name: 4,
        value: 4
      }];
      if (this.showAssociatedGroups) {
        this.loadAssociatedGroups();
      }
    },
    canEdit: (0, _computed.not)("model.automatic"),
    groupTrustLevel: (0, _object.computed)("model.grant_trust_level", "trustLevelOptions", function () {
      return this.model.get("grant_trust_level") || this.trustLevelOptions.firstObject.value;
    }),
    disableMembershipRequestSetting(visibility_level, publicAdmission) {
      visibility_level = parseInt(visibility_level, 10);
      return publicAdmission || visibility_level > 1;
    },
    disablePublicSetting(visibility_level, allowMembershipRequests) {
      visibility_level = parseInt(visibility_level, 10);
      return allowMembershipRequests || visibility_level > 1;
    },
    emailDomains: (0, _object.computed)("model.emailDomains", function () {
      return this.model.emailDomains.split(this.tokenSeparator).filter(Boolean);
    }),
    loadAssociatedGroups() {
      _associatedGroup.default.list().then(ags => this.set("associatedGroups", ags));
    },
    actions: {
      onChangeEmailDomainsSetting(value) {
        this.set("model.automatic_membership_email_domains", value.join(this.tokenSeparator));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "disableMembershipRequestSetting", [_dec], Object.getOwnPropertyDescriptor(_obj, "disableMembershipRequestSetting"), _obj), _applyDecoratedDescriptor(_obj, "disablePublicSetting", [_dec2], Object.getOwnPropertyDescriptor(_obj, "disablePublicSetting"), _obj)), _obj))));
  _exports.default = _default;
});