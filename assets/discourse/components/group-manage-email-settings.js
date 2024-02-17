define("discourse/components/group-manage-email-settings", ["exports", "@ember/component", "@ember/template-factory", "@ember/utils", "discourse-common/utils/decorators", "I18n", "@ember/service", "@ember/object"], function (_exports, _component, _templateFactory, _utils, _decorators, _I18n, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/utils",0,"discourse-common/utils/decorators",0,"I18n",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="group-manage-email-settings">
    <h3>{{i18n "groups.manage.email.smtp_title"}}</h3>
    <p>{{i18n "groups.manage.email.smtp_instructions"}}</p>
  
    <label for="enable_smtp">
      <Input
        @type="checkbox"
        @checked={{this.group.smtp_enabled}}
        id="enable_smtp"
        tabindex="1"
        {{on "input" this.smtpEnabledChange}}
      />
      {{i18n "groups.manage.email.enable_smtp"}}
    </label>
  
    {{#if this.group.smtp_enabled}}
      <GroupSmtpEmailSettings
        @group={{this.group}}
        @smtpSettingsValid={{this.smtpSettingsValid}}
      />
    {{/if}}
  
    {{#if this.siteSettings.enable_imap}}
      <div class="group-manage-email-imap-wrapper">
        <br />
  
        <h3>{{i18n "groups.manage.email.imap_title"}}</h3>
        <p>
          {{html-safe (i18n "groups.manage.email.imap_instructions")}}
        </p>
  
        <div class="alert alert-warning">{{i18n
            "groups.manage.email.imap_alpha_warning"
          }}</div>
  
        <label for="enable_imap">
          <Input
            @type="checkbox"
            disabled={{not this.enableImapSettings}}
            @checked={{this.group.imap_enabled}}
            id="enable_imap"
            tabindex="8"
            {{on "input" this.imapEnabledChange}}
          />
          {{i18n "groups.manage.email.enable_imap"}}
        </label>
  
        {{#if this.group.imap_enabled}}
          <GroupImapEmailSettings
            @group={{this.group}}
            @imapSettingsValid={{this.imapSettingsValid}}
          />
        {{/if}}
      </div>
    {{/if}}
  
    <div class="group-manage-email-additional-settings-wrapper">
      <div class="control-group">
        <h3>{{i18n "groups.manage.email.imap_additional_settings"}}</h3>
        <label
          class="control-group-inline"
          for="allow_unknown_sender_topic_replies"
        >
          <Input
            @type="checkbox"
            name="allow_unknown_sender_topic_replies"
            id="allow_unknown_sender_topic_replies"
            @checked={{this.group.allow_unknown_sender_topic_replies}}
            tabindex="13"
          />
          <span>{{i18n
              "groups.manage.email.settings.allow_unknown_sender_topic_replies"
            }}</span>
        </label>
        <p>{{i18n
            "groups.manage.email.settings.allow_unknown_sender_topic_replies_hint"
          }}</p>
      </div>
    </div>
  
    <br />
    <GroupManageSaveButton
      @model={{this.group}}
      @disabled={{not this.emailSettingsValid}}
      @beforeSave={{this.beforeSave}}
      @afterSave={{this.afterSave}}
      @tabindex="15"
    />
  </div>
  */
  {
    "id": "DXpBXUXQ",
    "block": "[[[10,0],[14,0,\"group-manage-email-settings\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[28,[35,0],[\"groups.manage.email.smtp_title\"],null]],[13],[1,\"\\n  \"],[10,2],[12],[1,[28,[35,0],[\"groups.manage.email.smtp_instructions\"],null]],[13],[1,\"\\n\\n  \"],[10,\"label\"],[14,\"for\",\"enable_smtp\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,1,\"enable_smtp\"],[24,\"tabindex\",\"1\"],[4,[38,2],[\"input\",[30,0,[\"smtpEnabledChange\"]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"group\",\"smtp_enabled\"]]]],null],[1,\"\\n    \"],[1,[28,[35,0],[\"groups.manage.email.enable_smtp\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"group\",\"smtp_enabled\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@group\",\"@smtpSettingsValid\"],[[30,0,[\"group\"]],[30,0,[\"smtpSettingsValid\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_imap\"]],[[[1,\"    \"],[10,0],[14,0,\"group-manage-email-imap-wrapper\"],[12],[1,\"\\n      \"],[10,\"br\"],[12],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[12],[1,[28,[35,0],[\"groups.manage.email.imap_title\"],null]],[13],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        \"],[1,[28,[35,5],[[28,[37,0],[\"groups.manage.email.imap_instructions\"],null]],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"alert alert-warning\"],[12],[1,[28,[35,0],[\"groups.manage.email.imap_alpha_warning\"],null]],[13],[1,\"\\n\\n      \"],[10,\"label\"],[14,\"for\",\"enable_imap\"],[12],[1,\"\\n        \"],[8,[39,1],[[16,\"disabled\",[28,[37,6],[[30,0,[\"enableImapSettings\"]]],null]],[24,1,\"enable_imap\"],[24,\"tabindex\",\"8\"],[4,[38,2],[\"input\",[30,0,[\"imapEnabledChange\"]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"group\",\"imap_enabled\"]]]],null],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.enable_imap\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"group\",\"imap_enabled\"]],[[[1,\"        \"],[8,[39,7],null,[[\"@group\",\"@imapSettingsValid\"],[[30,0,[\"group\"]],[30,0,[\"imapSettingsValid\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"group-manage-email-additional-settings-wrapper\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,[28,[35,0],[\"groups.manage.email.imap_additional_settings\"],null]],[13],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-group-inline\"],[14,\"for\",\"allow_unknown_sender_topic_replies\"],[12],[1,\"\\n        \"],[8,[39,1],[[24,3,\"allow_unknown_sender_topic_replies\"],[24,1,\"allow_unknown_sender_topic_replies\"],[24,\"tabindex\",\"13\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"group\",\"allow_unknown_sender_topic_replies\"]]]],null],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,0],[\"groups.manage.email.settings.allow_unknown_sender_topic_replies\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,2],[12],[1,[28,[35,0],[\"groups.manage.email.settings.allow_unknown_sender_topic_replies_hint\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"br\"],[12],[13],[1,\"\\n  \"],[8,[39,8],null,[[\"@model\",\"@disabled\",\"@beforeSave\",\"@afterSave\",\"@tabindex\"],[[30,0,[\"group\"]],[28,[37,6],[[30,0,[\"emailSettingsValid\"]]],null],[30,0,[\"beforeSave\"]],[30,0,[\"afterSave\"]],\"15\"]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"input\",\"on\",\"if\",\"group-smtp-email-settings\",\"html-safe\",\"not\",\"group-imap-email-settings\",\"group-manage-save-button\"]]",
    "moduleName": "discourse/components/group-manage-email-settings.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("emailSettingsValid", "group.smtp_enabled", "group.imap_enabled"), _dec3 = (0, _decorators.default)("smtpSettingsValid", "imapSettingsValid", "group.smtp_enabled", "group.imap_enabled"), (_obj = {
    tagName: "",
    dialog: (0, _service.inject)(),
    imapSettingsValid: false,
    smtpSettingsValid: false,
    _determineSettingsValid() {
      this.set("imapSettingsValid", this.group.imap_enabled && this.group.imap_server);
      this.set("smtpSettingsValid", this.group.smtp_enabled && this.group.smtp_server);
    },
    enableImapSettings(emailSettingsValid, smtpEnabled, imapEnabled) {
      return smtpEnabled && (emailSettingsValid || imapEnabled);
    },
    emailSettingsValid(smtpSettingsValid, imapSettingsValid, smtpEnabled, imapEnabled) {
      return (!smtpEnabled || smtpSettingsValid) && (!imapEnabled || imapSettingsValid);
    },
    _anySmtpFieldsFilled() {
      return [this.group.smtp_server, this.group.smtp_port, this.group.email_username, this.group.email_password].some(value => !(0, _utils.isEmpty)(value));
    },
    _anyImapFieldsFilled() {
      return [this.group.imap_server, this.group.imap_port].some(value => !(0, _utils.isEmpty)(value));
    },
    smtpEnabledChange(event) {
      if (!event.target.checked && this.group.smtp_enabled && this._anySmtpFieldsFilled()) {
        this.dialog.confirm({
          message: _I18n.default.t("groups.manage.email.smtp_disable_confirm"),
          didConfirm: () => this.group.set("smtp_enabled", true),
          didCancel: () => this.group.set("imap_enabled", false)
        });
      }
      this.group.set("smtp_enabled", event.target.checked);
    },
    imapEnabledChange(event) {
      if (!event.target.checked && this.group.imap_enabled && this._anyImapFieldsFilled()) {
        this.dialog.confirm({
          message: _I18n.default.t("groups.manage.email.imap_disable_confirm"),
          didConfirm: () => this.group.set("imap_enabled", true)
        });
      }
      this.group.set("imap_enabled", event.target.checked);
    },
    afterSave() {
      // reload the group to get the updated imap_mailboxes
      this.store.find("group", this.group.name).then(() => {
        this._determineSettingsValid();
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_determineSettingsValid", [_dec], Object.getOwnPropertyDescriptor(_obj, "_determineSettingsValid"), _obj), _applyDecoratedDescriptor(_obj, "enableImapSettings", [_dec2], Object.getOwnPropertyDescriptor(_obj, "enableImapSettings"), _obj), _applyDecoratedDescriptor(_obj, "emailSettingsValid", [_dec3], Object.getOwnPropertyDescriptor(_obj, "emailSettingsValid"), _obj), _applyDecoratedDescriptor(_obj, "smtpEnabledChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "smtpEnabledChange"), _obj), _applyDecoratedDescriptor(_obj, "imapEnabledChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "imapEnabledChange"), _obj), _applyDecoratedDescriptor(_obj, "afterSave", [_object.action], Object.getOwnPropertyDescriptor(_obj, "afterSave"), _obj)), _obj))));
  _exports.default = _default;
});