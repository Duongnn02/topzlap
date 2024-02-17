define("discourse/components/groups-form-interaction-fields", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse/lib/notification-levels", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _I18n, _notificationLevels, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse/lib/notification-levels",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.canAdminGroup}}
    <div class="control-group">
      <label class="control-label">{{i18n
          "admin.groups.manage.interaction.visibility"
        }}</label>
      <label for="visiblity">{{i18n
          "admin.groups.manage.interaction.visibility_levels.title"
        }}</label>
  
      <ComboBox
        @name="alias"
        @valueProperty="value"
        @value={{this.model.visibility_level}}
        @content={{this.visibilityLevelOptions}}
        @class="groups-form-visibility-level"
        @onChange={{action (mut this.model.visibility_level)}}
        @options={{hash castInteger=true}}
      />
  
      <div class="control-instructions">
        {{i18n "admin.groups.manage.interaction.visibility_levels.description"}}
      </div>
    </div>
  
    <div class="control-group">
      <label for="visiblity">{{i18n
          "admin.groups.manage.interaction.members_visibility_levels.title"
        }}</label>
  
      <ComboBox
        @name="alias"
        @valueProperty="value"
        @value={{this.membersVisibilityLevel}}
        @content={{this.visibilityLevelOptions}}
        @class="groups-form-members-visibility-level"
        @onChange={{action (mut this.model.members_visibility_level)}}
      />
  
      {{#if this.membersVisibilityPrivate}}
        <div class="control-instructions">
          {{i18n
            "admin.groups.manage.interaction.members_visibility_levels.description"
          }}
        </div>
      {{/if}}
    </div>
  {{/if}}
  
  <div class="control-group">
    <label class="control-label">{{i18n
        "groups.manage.interaction.posting"
      }}</label>
    <label for="alias">{{i18n "groups.alias_levels.mentionable"}}</label>
  
    <ComboBox
      @name="alias"
      @valueProperty="value"
      @value={{this.mentionableLevel}}
      @content={{this.aliasLevelOptions}}
      @class="groups-form-mentionable-level"
      @onChange={{action (mut this.model.mentionable_level)}}
    />
  </div>
  
  <div class="control-group">
    <label for="alias">{{i18n "groups.alias_levels.messageable"}}</label>
  
    <ComboBox
      @name="alias"
      @valueProperty="value"
      @value={{this.messageableLevel}}
      @content={{this.aliasLevelOptions}}
      @class="groups-form-messageable-level"
      @onChange={{action (mut this.model.messageable_level)}}
    />
  </div>
  
  {{#if this.canAdminGroup}}
    <div class="control-group">
      <label>
        <Input
          @type="checkbox"
          @checked={{this.model.publish_read_state}}
          class="groups-form-publish-read-state"
        />
  
        {{i18n "admin.groups.manage.interaction.publish_read_state"}}
      </label>
    </div>
  {{/if}}
  
  {{#if this.showEmailSettings}}
    <div class="control-group">
      <label class="control-label">{{i18n
          "admin.groups.manage.interaction.email"
        }}</label>
      <label for="incoming_email">{{i18n
          "admin.groups.manage.interaction.incoming_email"
        }}</label>
  
      <TextField
        @name="incoming_email"
        @class="input-xxlarge groups-form-incoming-email"
        @value={{this.model.incoming_email}}
        @placeholderKey="admin.groups.manage.interaction.incoming_email_placeholder"
      />
  
      <span>
        <PluginOutlet
          @name="group-email-in"
          @connectorTagName="div"
          @outletArgs={{hash model=this.model}}
        />
      </span>
    </div>
  {{/if}}
  
  <label class="control-label">{{i18n
      "groups.manage.interaction.notification"
    }}</label>
  
  <div class="control-group">
    <label>{{i18n "groups.notification_level"}}</label>
  
    <NotificationsButton
      @value={{this.defaultNotificationLevel}}
      @class="groups-form-default-notification-level"
      @options={{hash i18nPrefix="groups.notifications"}}
      @onChange={{action (mut this.model.default_notification_level)}}
    />
  </div>
  
  <span>
    <PluginOutlet
      @name="groups-interaction-custom-options"
      @connectorTagName="div"
      @outletArgs={{hash model=this.model}}
    />
  </span>
  */
  {
    "id": "ZUf1ERjK",
    "block": "[[[41,[30,0,[\"canAdminGroup\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"admin.groups.manage.interaction.visibility\"],null]],[13],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"visiblity\"],[12],[1,[28,[35,1],[\"admin.groups.manage.interaction.visibility_levels.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\",\"@options\"],[\"alias\",\"value\",[30,0,[\"model\",\"visibility_level\"]],[30,0,[\"visibilityLevelOptions\"]],\"groups-form-visibility-level\",[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"visibility_level\"]]],null]],null],[28,[37,5],null,[[\"castInteger\"],[true]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"admin.groups.manage.interaction.visibility_levels.description\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"visiblity\"],[12],[1,[28,[35,1],[\"admin.groups.manage.interaction.members_visibility_levels.title\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,2],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\"],[\"alias\",\"value\",[30,0,[\"membersVisibilityLevel\"]],[30,0,[\"visibilityLevelOptions\"]],\"groups-form-members-visibility-level\",[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"members_visibility_level\"]]],null]],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"membersVisibilityPrivate\"]],[[[1,\"      \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"admin.groups.manage.interaction.members_visibility_levels.description\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"groups.manage.interaction.posting\"],null]],[13],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"alias\"],[12],[1,[28,[35,1],[\"groups.alias_levels.mentionable\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\"],[\"alias\",\"value\",[30,0,[\"mentionableLevel\"]],[30,0,[\"aliasLevelOptions\"]],\"groups-form-mentionable-level\",[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"mentionable_level\"]]],null]],null]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"alias\"],[12],[1,[28,[35,1],[\"groups.alias_levels.messageable\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\"],[\"alias\",\"value\",[30,0,[\"messageableLevel\"]],[30,0,[\"aliasLevelOptions\"]],\"groups-form-messageable-level\",[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"messageable_level\"]]],null]],null]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canAdminGroup\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,6],[[24,0,\"groups-form-publish-read-state\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"publish_read_state\"]]]],null],[1,\"\\n\\n      \"],[1,[28,[35,1],[\"admin.groups.manage.interaction.publish_read_state\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showEmailSettings\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"admin.groups.manage.interaction.email\"],null]],[13],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"incoming_email\"],[12],[1,[28,[35,1],[\"admin.groups.manage.interaction.incoming_email\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,7],null,[[\"@name\",\"@class\",\"@value\",\"@placeholderKey\"],[\"incoming_email\",\"input-xxlarge groups-form-incoming-email\",[30,0,[\"model\",\"incoming_email\"]],\"admin.groups.manage.interaction.incoming_email_placeholder\"]],null],[1,\"\\n\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"group-email-in\",\"div\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,1],[\"groups.manage.interaction.notification\"],null]],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,1],[\"groups.notification_level\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,9],null,[[\"@value\",\"@class\",\"@options\",\"@onChange\"],[[30,0,[\"defaultNotificationLevel\"]],\"groups-form-default-notification-level\",[28,[37,5],null,[[\"i18nPrefix\"],[\"groups.notifications\"]]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"model\",\"default_notification_level\"]]],null]],null]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,1],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"groups-interaction-custom-options\",\"div\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"if\",\"i18n\",\"combo-box\",\"action\",\"mut\",\"hash\",\"input\",\"text-field\",\"plugin-outlet\",\"notifications-button\"]]",
    "moduleName": "discourse/components/groups-form-interaction-fields.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.default_notification_level", "watchingNotificationLevel"), _dec2 = (0, _decorators.default)("siteSettings.email_in", "model.automatic", "currentUser.admin"), _dec3 = (0, _decorators.default)("model.isCreated", "model.can_admin_group", "currentUser.can_create_group"), _dec4 = (0, _decorators.default)("membersVisibilityLevel"), (_obj = {
    init() {
      this._super(...arguments);
      this.visibilityLevelOptions = [{
        name: _I18n.default.t("admin.groups.manage.interaction.visibility_levels.public"),
        value: 0
      }, {
        name: _I18n.default.t("admin.groups.manage.interaction.visibility_levels.logged_on_users"),
        value: 1
      }, {
        name: _I18n.default.t("admin.groups.manage.interaction.visibility_levels.members"),
        value: 2
      }, {
        name: _I18n.default.t("admin.groups.manage.interaction.visibility_levels.staff"),
        value: 3
      }, {
        name: _I18n.default.t("admin.groups.manage.interaction.visibility_levels.owners"),
        value: 4
      }];
      this.aliasLevelOptions = [{
        name: _I18n.default.t("groups.alias_levels.nobody"),
        value: 0
      }, {
        name: _I18n.default.t("groups.alias_levels.only_admins"),
        value: 1
      }, {
        name: _I18n.default.t("groups.alias_levels.mods_and_admins"),
        value: 2
      }, {
        name: _I18n.default.t("groups.alias_levels.members_mods_and_admins"),
        value: 3
      }, {
        name: _I18n.default.t("groups.alias_levels.owners_mods_and_admins"),
        value: 4
      }, {
        name: _I18n.default.t("groups.alias_levels.everyone"),
        value: 99
      }];
      this.watchingNotificationLevel = _notificationLevels.NotificationLevels.WATCHING;
    },
    membersVisibilityLevel: (0, _computed.or)("model.members_visibility_level", "visibilityLevelOptions.firstObject.value"),
    messageableLevel: (0, _computed.or)("model.messageable_level", "aliasLevelOptions.firstObject.value"),
    mentionableLevel: (0, _computed.or)("model.mentionable_level", "aliasLevelOptions.firstObject.value"),
    defaultNotificationLevel(defaultNotificationLevel, watchingNotificationLevel) {
      if (Object.values(_notificationLevels.NotificationLevels).includes(defaultNotificationLevel)) {
        return defaultNotificationLevel;
      }
      return watchingNotificationLevel;
    },
    showEmailSettings(emailIn, automatic, isAdmin) {
      return emailIn && isAdmin && !automatic;
    },
    canAdminGroup(isCreated, canAdmin, canCreate) {
      return !isCreated && canCreate || isCreated && canAdmin;
    },
    membersVisibilityPrivate(membersVisibilityLevel) {
      return membersVisibilityLevel !== this.visibilityLevelOptions.firstObject.value;
    }
  }, (_applyDecoratedDescriptor(_obj, "defaultNotificationLevel", [_dec], Object.getOwnPropertyDescriptor(_obj, "defaultNotificationLevel"), _obj), _applyDecoratedDescriptor(_obj, "showEmailSettings", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showEmailSettings"), _obj), _applyDecoratedDescriptor(_obj, "canAdminGroup", [_dec3], Object.getOwnPropertyDescriptor(_obj, "canAdminGroup"), _obj), _applyDecoratedDescriptor(_obj, "membersVisibilityPrivate", [_dec4], Object.getOwnPropertyDescriptor(_obj, "membersVisibilityPrivate"), _obj)), _obj))));
  _exports.default = _default;
});