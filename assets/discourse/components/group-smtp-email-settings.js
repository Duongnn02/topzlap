define("discourse/components/group-smtp-email-settings", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/email-provider-default-settings", "@ember/utils", "discourse/lib/ajax-error", "discourse-common/utils/decorators", "@ember/object", "discourse/lib/ajax"], function (_exports, _component, _templateFactory, _emailProviderDefaultSettings, _utils, _ajaxError, _decorators, _object, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/email-provider-default-settings",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators",0,"@ember/object",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="group-smtp-email-settings">
    <form class="groups-form form-horizontal">
      <div>
        <div class="control-group">
          <label for="username">{{i18n
              "groups.manage.email.credentials.username"
            }}</label>
          <Input
            @type="text"
            name="username"
            @value={{this.form.email_username}}
            tabindex="1"
            {{on "change" (action "resetSettingsValid")}}
          />
        </div>
  
        <div class="control-group">
          <label for="smtp_server">{{i18n
              "groups.manage.email.credentials.smtp_server"
            }}</label>
          <Input
            @type="text"
            name="smtp_server"
            @value={{this.form.smtp_server}}
            tabindex="4"
            {{on "change" (action "resetSettingsValid")}}
          />
        </div>
  
        <label for="enable_ssl">
          <Input
            @type="checkbox"
            @checked={{this.form.smtp_ssl}}
            id="enable_ssl"
            tabindex="6"
            {{on "change" (action "resetSettingsValid")}}
          />
          {{i18n "groups.manage.email.credentials.smtp_ssl"}}
        </label>
      </div>
  
      <div>
        <div class="control-group">
          <label for="password">{{i18n
              "groups.manage.email.credentials.password"
            }}</label>
          <Input
            @type="password"
            name="password"
            @value={{this.form.email_password}}
            tabindex="2"
            {{on "change" (action "resetSettingsValid")}}
          />
        </div>
  
        <div class="control-group">
          <label for="smtp_port">{{i18n
              "groups.manage.email.credentials.smtp_port"
            }}</label>
          <Input
            @type="text"
            name="smtp_port"
            @value={{this.form.smtp_port}}
            tabindex="5"
            {{on "change" (action "resetSettingsValid" this.form.smtp_port)}}
          />
        </div>
      </div>
  
      <div>
        <div class="control-group">
          <label for="from_alias">{{i18n
              "groups.manage.email.settings.from_alias"
            }}</label>
          <Input
            @type="text"
            name="from_alias"
            id="from_alias"
            @value={{this.form.email_from_alias}}
            {{on "change" (action "resetSettingsValid")}}
            tabindex="3"
          />
          <p>{{i18n "groups.manage.email.settings.from_alias_hint"}}</p>
        </div>
      </div>
    </form>
  
    <div class="control-group">
      <div class="group-smtp-prefill-options">
        {{i18n "groups.manage.email.prefill.title"}}
        <a
          id="prefill_smtp_gmail"
          href
          {{on "click" (fn this.prefillSettings "gmail")}}
        >{{i18n "groups.manage.email.prefill.gmail"}}</a>
      </div>
    </div>
  
    <div class="control-group buttons">
      <DButton
        @disabled={{or this.missingSettings this.testingSettings}}
        @class="btn-primary test-smtp-settings"
        @action={{action "testSmtpSettings"}}
        @icon="cog"
        @label="groups.manage.email.test_settings"
        @tabindex="7"
        @title="groups.manage.email.settings_required"
      />
  
      <ConditionalLoadingSpinner
        @size="small"
        @condition={{this.testingSettings}}
      />
  
      {{#if this.smtpSettingsValid}}
        <span class="smtp-settings-ok">
          {{d-icon "check-circle"}}
          {{i18n "groups.manage.email.smtp_settings_valid"}}
        </span>
      {{/if}}
    </div>
  
    {{#if this.group.smtp_updated_at}}
      <div class="group-email-last-updated-details for-smtp">
        <small>
          {{i18n "groups.manage.email.last_updated"}}
          <strong>{{format-date
              this.group.smtp_updated_at
              leaveAgo="true"
            }}</strong>
          {{i18n "groups.manage.email.last_updated_by"}}
          <LinkTo
            @route="user"
            @model={{this.group.smtp_updated_by.username}}
          >{{this.group.smtp_updated_by.username}}</LinkTo>
        </small>
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "RaciMW/t",
    "block": "[[[10,0],[14,0,\"group-smtp-email-settings\"],[12],[1,\"\\n  \"],[10,\"form\"],[14,0,\"groups-form form-horizontal\"],[12],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"username\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.username\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"username\"],[24,\"tabindex\",\"1\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"email_username\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"smtp_server\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.smtp_server\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"smtp_server\"],[24,\"tabindex\",\"4\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"smtp_server\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"label\"],[14,\"for\",\"enable_ssl\"],[12],[1,\"\\n        \"],[8,[39,1],[[24,1,\"enable_ssl\"],[24,\"tabindex\",\"6\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"form\",\"smtp_ssl\"]]]],null],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.credentials.smtp_ssl\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"password\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.password\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"password\"],[24,\"tabindex\",\"2\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@value\"],[\"password\",[30,0,[\"form\",\"email_password\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"smtp_port\"],[12],[1,[28,[35,0],[\"groups.manage.email.credentials.smtp_port\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"smtp_port\"],[24,\"tabindex\",\"5\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\",[30,0,[\"form\",\"smtp_port\"]]],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"smtp_port\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"from_alias\"],[12],[1,[28,[35,0],[\"groups.manage.email.settings.from_alias\"],null]],[13],[1,\"\\n        \"],[8,[39,1],[[24,3,\"from_alias\"],[24,1,\"from_alias\"],[24,\"tabindex\",\"3\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"resetSettingsValid\"],null]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"form\",\"email_from_alias\"]]]],null],[1,\"\\n        \"],[10,2],[12],[1,[28,[35,0],[\"groups.manage.email.settings.from_alias_hint\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"group-smtp-prefill-options\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.manage.email.prefill.title\"],null]],[1,\"\\n      \"],[11,3],[24,1,\"prefill_smtp_gmail\"],[24,6,\"\"],[4,[38,2],[\"click\",[28,[37,4],[[30,0,[\"prefillSettings\"]],\"gmail\"],null]],null],[12],[1,[28,[35,0],[\"groups.manage.email.prefill.gmail\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group buttons\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@disabled\",\"@class\",\"@action\",\"@icon\",\"@label\",\"@tabindex\",\"@title\"],[[28,[37,6],[[30,0,[\"missingSettings\"]],[30,0,[\"testingSettings\"]]],null],\"btn-primary test-smtp-settings\",[28,[37,3],[[30,0],\"testSmtpSettings\"],null],\"cog\",\"groups.manage.email.test_settings\",\"7\",\"groups.manage.email.settings_required\"]],null],[1,\"\\n\\n    \"],[8,[39,7],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"testingSettings\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"smtpSettingsValid\"]],[[[1,\"      \"],[10,1],[14,0,\"smtp-settings-ok\"],[12],[1,\"\\n        \"],[1,[28,[35,9],[\"check-circle\"],null]],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.smtp_settings_valid\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"group\",\"smtp_updated_at\"]],[[[1,\"    \"],[10,0],[14,0,\"group-email-last-updated-details for-smtp\"],[12],[1,\"\\n      \"],[10,\"small\"],[12],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.last_updated\"],null]],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[28,[35,10],[[30,0,[\"group\",\"smtp_updated_at\"]]],[[\"leaveAgo\"],[\"true\"]]]],[13],[1,\"\\n        \"],[1,[28,[35,0],[\"groups.manage.email.last_updated_by\"],null]],[1,\"\\n        \"],[8,[39,11],null,[[\"@route\",\"@model\"],[\"user\",[30,0,[\"group\",\"smtp_updated_by\",\"username\"]]]],[[\"default\"],[[[[1,[30,0,[\"group\",\"smtp_updated_by\",\"username\"]]]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"i18n\",\"input\",\"on\",\"action\",\"fn\",\"d-button\",\"or\",\"conditional-loading-spinner\",\"if\",\"d-icon\",\"format-date\",\"link-to\"]]",
    "moduleName": "discourse/components/group-smtp-email-settings.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("form.email_username", "form.email_password", "form.smtp_server", "form.smtp_port"), _dec2 = (0, _decorators.on)("init"), (_obj = {
    tagName: "",
    form: null,
    missingSettings(email_username, email_password, smtp_server, smtp_port) {
      return [email_username, email_password, smtp_server, smtp_port].some(value => (0, _utils.isEmpty)(value));
    },
    resetSettingsValid() {
      this.set("smtpSettingsValid", false);
    },
    _fillForm() {
      this.set("form", _object.default.create({
        email_username: this.group.email_username,
        email_password: this.group.email_password,
        email_from_alias: this.group.email_from_alias,
        smtp_server: this.group.smtp_server,
        smtp_port: (this.group.smtp_port || "").toString(),
        smtp_ssl: this.group.smtp_ssl
      }));
    },
    prefillSettings(provider, event) {
      event?.preventDefault();
      this.form.setProperties((0, _emailProviderDefaultSettings.default)(provider, "smtp"));
    },
    testSmtpSettings() {
      const settings = {
        host: this.form.smtp_server,
        port: this.form.smtp_port,
        ssl: this.form.smtp_ssl,
        username: this.form.email_username,
        password: this.form.email_password
      };
      this.set("testingSettings", true);
      this.set("smtpSettingsValid", false);
      return (0, _ajax.ajax)(`/groups/${this.group.id}/test_email_settings`, {
        type: "POST",
        data: Object.assign(settings, {
          protocol: "smtp"
        })
      }).then(() => {
        this.set("smtpSettingsValid", true);
        this.group.setProperties({
          smtp_server: this.form.smtp_server,
          smtp_port: this.form.smtp_port,
          smtp_ssl: this.form.smtp_ssl,
          email_username: this.form.email_username,
          email_from_alias: this.form.email_from_alias,
          email_password: this.form.email_password
        });
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("testingSettings", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "missingSettings", [_dec], Object.getOwnPropertyDescriptor(_obj, "missingSettings"), _obj), _applyDecoratedDescriptor(_obj, "resetSettingsValid", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetSettingsValid"), _obj), _applyDecoratedDescriptor(_obj, "_fillForm", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_fillForm"), _obj), _applyDecoratedDescriptor(_obj, "prefillSettings", [_object.action], Object.getOwnPropertyDescriptor(_obj, "prefillSettings"), _obj), _applyDecoratedDescriptor(_obj, "testSmtpSettings", [_object.action], Object.getOwnPropertyDescriptor(_obj, "testSmtpSettings"), _obj)), _obj))));
  _exports.default = _default;
});