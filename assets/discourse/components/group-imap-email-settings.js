define("discourse/components/group-imap-email-settings", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/email-provider-default-settings", "@ember/utils", "discourse/lib/ajax-error", "discourse-common/utils/decorators", "@ember/object", "discourse/lib/ajax"], function (_exports, _component, _templateFactory, _emailProviderDefaultSettings, _utils, _ajaxError, _decorators, _object, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/email-provider-default-settings",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators",0,"@ember/object",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="group-imap-email-settings">
    <form class="groups-form form-horizontal groups-form-imap">
      <div>
        <div class="control-group">
          <label for="imap_server">{{i18n
              "groups.manage.email.credentials.imap_server"
            }}</label>
          <Input
            @type="text"
            name="imap_server"
            @value={{this.form.imap_server}}
            tabindex="8"
            {{on "change" (action "resetSettingsValid")}}
          />
        </div>
  
        <label for="enable_ssl_imap">
          <Input
            @type="checkbox"
            @checked={{this.form.imap_ssl}}
            id="enable_ssl_imap"
            tabindex="11"
            {{on "change" (action "resetSettingsValid")}}
          />
          {{i18n "groups.manage.email.credentials.imap_ssl"}}
        </label>
      </div>
  
      <div>
        <div class="control-group">
          <label for="imap_port">{{i18n
              "groups.manage.email.credentials.imap_port"
            }}</label>
          <Input
            @type="text"
            name="imap_port"
            @value={{this.form.imap_port}}
            tabindex="9"
            {{on "change" (action "resetSettingsValid" this.form.imap_port)}}
          />
        </div>
      </div>
  
      <div>
        <div class="control-group group-imap-mailboxes">
          {{#if this.mailboxes}}
            <label for="imap_mailbox_name">{{i18n
                "groups.manage.email.mailboxes.synchronized"
              }}</label>
            <ComboBox
              @name="imap_mailbox_name"
              @id="imap_mailbox"
              @value={{this.group.imap_mailbox_name}}
              @valueProperty="value"
              @content={{this.mailboxes}}
              @tabindex="10"
              @onChange={{action (mut this.group.imap_mailbox_name)}}
              @options={{hash none="groups.manage.email.mailboxes.disabled"}}
            />
          {{/if}}
        </div>
  
      </div>
    </form>
  
    <div class="control-group">
      <div class="group-imap-prefill-options">
        {{i18n "groups.manage.email.prefill.title"}}
        <a
          id="prefill_imap_gmail"
          href
          {{on "click" (fn this.prefillSettings "gmail")}}
        >{{i18n "groups.manage.email.prefill.gmail"}}</a>
      </div>
    </div>
  
    {{#unless this.mailboxSelected}}
      <div class="alert alert-error imap-no-mailbox-selected">
        {{i18n "groups.manage.email.imap_mailbox_not_selected"}}
      </div>
    {{/unless}}
  
    <div class="control-group buttons">
      <DButton
        @disabled={{or this.missingSettings this.testingSettings}}
        @class="btn-primary test-imap-settings"
        @action={{action "testImapSettings"}}
        @icon="cog"
        @label="groups.manage.email.test_settings"
        @tabindex="12"
        @title="groups.manage.email.settings_required"
      />
  
      <ConditionalLoadingSpinner
        @size="small"
        @condition={{this.testingSettings}}
      />
  
      {{#if this.imapSettingsValid}}
        <span class="imap-settings-ok">
          {{d-icon "check-circle"}}
          {{i18n "groups.manage.email.imap_settings_valid"}}
        </span>
      {{/if}}
    </div>
  
    {{#if this.group.imap_updated_at}}
      <div class="group-email-last-updated-details for-imap">
        <small>
          {{i18n "groups.manage.email.last_updated"}}
          <strong>{{format-date
              this.group.imap_updated_at
              leaveAgo="true"
            }}</strong>
          {{i18n "groups.manage.email.last_updated_by"}}
          <LinkTo
            @route="user"
            @model={{this.group.imap_updated_by.username}}
          >{{this.group.imap_updated_by.username}}</LinkTo>
        </small>
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "XifFg+v9",
    "block": "[[[10,0],[14,0,\"group-imap-email-settings\"],[12],[1,\"\\n  \"],[10,\"form\"],[14,0,\"groups-form form-horizontal groups-form-imap\"],[12],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"imap_server\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.imap_server\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"imap_server\"],[24,\"tabindex\",\"8\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"imap_server\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"label\"],[14,\"for\",\"enable_ssl_imap\"],[12],[1,\"\\n        \"],[8,[39,1],[[24,1,\"enable_ssl_imap\"],[24,\"tabindex\",\"11\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"form\",\"imap_ssl\"]]]],null],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.credentials.imap_ssl\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"imap_port\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.imap_port\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"imap_port\"],[24,\"tabindex\",\"9\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\",[30,0,[\"form\",\"imap_port\"]]],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"imap_port\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group group-imap-mailboxes\"],[12],[1,\"\\n\"],[41,[30,0,[\"mailboxes\"]],[[[1,\"          \"],[10,\"label\"],[14,\"for\",\"imap_mailbox_name\"],[12],[1,[28,[35,0],[\"groups.manage.email.mailboxes.synchronized\"],null]],[13],[1,\"\\n          \"],[8,[39,5],null,[[\"@name\",\"@id\",\"@value\",\"@valueProperty\",\"@content\",\"@tabindex\",\"@onChange\",\"@options\"],[\"imap_mailbox_name\",\"imap_mailbox\",[30,0,[\"group\",\"imap_mailbox_name\"]],\"value\",[30,0,[\"mailboxes\"]],\"10\",[28,[37,3],[[30,0],[28,[37,6],[[30,0,[\"group\",\"imap_mailbox_name\"]]],null]],null],[28,[37,7],null,[[\"none\"],[\"groups.manage.email.mailboxes.disabled\"]]]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"group-imap-prefill-options\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.email.prefill.title\"],null]],[1,\"\\n      \"],[11,3],[24,1,\"prefill_imap_gmail\"],[24,6,\"\"],[4,[38,2],[\"click\",[28,[37,8],[[30,0,[\"prefillSettings\"]],\"gmail\"],null]],null],[12],[1,[28,[35,0],[\"groups.manage.email.prefill.gmail\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"mailboxSelected\"]]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-error imap-no-mailbox-selected\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.email.imap_mailbox_not_selected\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"control-group buttons\"],[12],[1,\"\\n    \"],[8,[39,10],null,[[\"@disabled\",\"@class\",\"@action\",\"@icon\",\"@label\",\"@tabindex\",\"@title\"],[[28,[37,11],[[30,0,[\"missingSettings\"]],[30,0,[\"testingSettings\"]]],null],\"btn-primary test-imap-settings\",[28,[37,3],[[30,0],\"testImapSettings\"],null],\"cog\",\"groups.manage.email.test_settings\",\"12\",\"groups.manage.email.settings_required\"]],null],[1,\"\\n\\n    \"],[8,[39,12],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"testingSettings\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"imapSettingsValid\"]],[[[1,\"      \"],[10,1],[14,0,\"imap-settings-ok\"],[12],[1,\"\\n        \"],[1,[28,[35,13],[\"check-circle\"],null]],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.imap_settings_valid\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"group\",\"imap_updated_at\"]],[[[1,\"    \"],[10,0],[14,0,\"group-email-last-updated-details for-imap\"],[12],[1,\"\\n      \"],[10,\"small\"],[12],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.last_updated\"],null]],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[28,[35,14],[[30,0,[\"group\",\"imap_updated_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.last_updated_by\"],null]],[1,\"\\n        \"],[8,[39,15],null,[[\"@route\",\"@model\"],[\"user\",[30,0,[\"group\",\"imap_updated_by\",\"username\"]]]],[[\"default\"],[[[[1,[30,0,[\"group\",\"imap_updated_by\",\"username\"]]]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"i18n\",\"input\",\"on\",\"action\",\"if\",\"combo-box\",\"mut\",\"hash\",\"fn\",\"unless\",\"d-button\",\"or\",\"conditional-loading-spinner\",\"d-icon\",\"format-date\",\"link-to\"]]",
    "moduleName": "discourse/components/group-imap-email-settings.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("group.email_username", "group.email_password", "form.imap_server", "form.imap_port"), _dec2 = (0, _decorators.default)("group.imap_mailboxes"), _dec3 = (0, _decorators.default)("group.imap_mailbox_name", "mailboxes.length"), _dec4 = (0, _decorators.on)("init"), (_obj = {
    tagName: "",
    form: null,
    missingSettings(email_username, email_password, imap_server, imap_port) {
      return [email_username, email_password, imap_server, imap_port].some(value => (0, _utils.isEmpty)(value));
    },
    mailboxes(imapMailboxes) {
      if (!imapMailboxes) {
        return [];
      }
      return imapMailboxes.map(mailbox => ({
        name: mailbox,
        value: mailbox
      }));
    },
    mailboxSelected(mailboxName, mailboxesSize) {
      return mailboxesSize === 0 || !(0, _utils.isEmpty)(mailboxName);
    },
    resetSettingsValid() {
      this.set("imapSettingsValid", false);
    },
    _fillForm() {
      this.set("form", _object.default.create({
        imap_server: this.group.imap_server,
        imap_port: (this.group.imap_port || "").toString(),
        imap_ssl: this.group.imap_ssl
      }));
    },
    prefillSettings(provider, event) {
      event?.preventDefault();
      this.form.setProperties((0, _emailProviderDefaultSettings.default)(provider, "imap"));
    },
    testImapSettings() {
      const settings = {
        host: this.form.imap_server,
        port: this.form.imap_port,
        ssl: this.form.imap_ssl,
        username: this.group.email_username,
        password: this.group.email_password
      };
      this.set("testingSettings", true);
      this.set("imapSettingsValid", false);
      return (0, _ajax.ajax)(`/groups/${this.group.id}/test_email_settings`, {
        type: "POST",
        data: Object.assign(settings, {
          protocol: "imap"
        })
      }).then(() => {
        this.set("imapSettingsValid", true);
        this.group.setProperties({
          imap_server: this.form.imap_server,
          imap_port: this.form.imap_port,
          imap_ssl: this.form.imap_ssl
        });
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("testingSettings", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "missingSettings", [_dec], Object.getOwnPropertyDescriptor(_obj, "missingSettings"), _obj), _applyDecoratedDescriptor(_obj, "mailboxes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "mailboxes"), _obj), _applyDecoratedDescriptor(_obj, "mailboxSelected", [_dec3], Object.getOwnPropertyDescriptor(_obj, "mailboxSelected"), _obj), _applyDecoratedDescriptor(_obj, "resetSettingsValid", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetSettingsValid"), _obj), _applyDecoratedDescriptor(_obj, "_fillForm", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_fillForm"), _obj), _applyDecoratedDescriptor(_obj, "prefillSettings", [_object.action], Object.getOwnPropertyDescriptor(_obj, "prefillSettings"), _obj), _applyDecoratedDescriptor(_obj, "testImapSettings", [_object.action], Object.getOwnPropertyDescriptor(_obj, "testImapSettings"), _obj)), _obj))));
  _exports.default = _default;
});