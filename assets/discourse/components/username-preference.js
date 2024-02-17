define("discourse/components/username-preference", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "discourse/lib/url", "@ember/object/computed", "discourse/lib/computed", "I18n", "discourse/models/user", "@ember/utils", "discourse/lib/ajax-error", "@ember/service", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _tracking, _url, _computed, _computed2, _I18n, _user, _utils, _ajaxError, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"discourse/lib/url",0,"@ember/object/computed",0,"discourse/lib/computed",0,"I18n",0,"discourse/models/user",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.editing}}
    <form class="form-horizontal">
      <div class="control-group">
        <Input
          {{on "input" this.onInput}}
          @value={{this.newUsername}}
          maxlength={{this.maxLength}}
          class="input-xxlarge username-preference__input"
        />
  
        <div class="instructions">
          <p>
            {{#if this.taken}}
              {{i18n "user.change_username.taken"}}
            {{/if}}
            <span>{{this.errorMessage}}</span>
          </p>
        </div>
      </div>
  
      <div class="control-group">
        <DButton
          @action={{this.changeUsername}}
          @type="submit"
          @disabled={{this.saveDisabled}}
          @translatedLabel={{this.saveButtonText}}
          class="btn-primary username-preference__submit"
        />
  
        <DModalCancel @close={{this.toggleEditing}} />
  
        {{#if this.saved}}{{i18n "saved"}}{{/if}}
      </div>
    </form>
  {{else}}
    <div class="controls">
      <span
        class="static username-preference__current-username"
      >{{@user.username}}</span>
  
      {{#if @user.can_edit_username}}
        <DButton
          @action={{this.toggleEditing}}
          @actionParam={{@user}}
          @icon="pencil-alt"
          @title="user.username.edit"
          class="btn-small username-preference__edit-username"
        />
      {{/if}}
    </div>
  
    {{#if this.siteSettings.enable_mentions}}
      <div class="instructions">
        {{html-safe
          (i18n "user.username.short_instructions" username=@user.username)
        }}
      </div>
    {{/if}}
  {{/if}}
  */
  {
    "id": "P10oP6D+",
    "block": "[[[41,[30,0,[\"editing\"]],[[[1,\"  \"],[10,\"form\"],[14,0,\"form-horizontal\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[8,[39,1],[[16,\"maxlength\",[30,0,[\"maxLength\"]]],[24,0,\"input-xxlarge username-preference__input\"],[4,[38,2],[\"input\",[30,0,[\"onInput\"]]],null]],[[\"@value\"],[[30,0,[\"newUsername\"]]]],null],[1,\"\\n\\n      \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n        \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"taken\"]],[[[1,\"            \"],[1,[28,[35,3],[\"user.change_username.taken\"],null]],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,1],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[8,[39,4],[[24,0,\"btn-primary username-preference__submit\"]],[[\"@action\",\"@type\",\"@disabled\",\"@translatedLabel\"],[[30,0,[\"changeUsername\"]],\"submit\",[30,0,[\"saveDisabled\"]],[30,0,[\"saveButtonText\"]]]],null],[1,\"\\n\\n      \"],[8,[39,5],null,[[\"@close\"],[[30,0,[\"toggleEditing\"]]]],null],[1,\"\\n\\n      \"],[41,[30,0,[\"saved\"]],[[[1,[28,[35,3],[\"saved\"],null]]],[]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"static username-preference__current-username\"],[12],[1,[30,1,[\"username\"]]],[13],[1,\"\\n\\n\"],[41,[30,1,[\"can_edit_username\"]],[[[1,\"      \"],[8,[39,4],[[24,0,\"btn-small username-preference__edit-username\"]],[[\"@action\",\"@actionParam\",\"@icon\",\"@title\"],[[30,0,[\"toggleEditing\"]],[30,1],\"pencil-alt\",\"user.username.edit\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"enable_mentions\"]],[[[1,\"    \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,6],[[28,[37,3],[\"user.username.short_instructions\"],[[\"username\"],[[30,1,[\"username\"]]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]],[\"@user\"],false,[\"if\",\"input\",\"on\",\"i18n\",\"d-button\",\"d-modal-cancel\",\"html-safe\"]]",
    "moduleName": "discourse/components/username-preference.hbs",
    "isStrictMode": false
  });
  let UsernamePreference = (_dec = (0, _computed2.setting)("max_username_length"), _dec2 = (0, _computed2.setting)("min_username_length"), _dec3 = (0, _computed.empty)("newUsername"), _dec4 = (0, _computed.or)("saving", "newUsernameEmpty", "taken", "unchanged", "errorMessage"), (_class = class UsernamePreference extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "siteSettings", _descriptor, this);
      _initializerDefineProperty(this, "dialog", _descriptor2, this);
      _initializerDefineProperty(this, "editing", _descriptor3, this);
      _initializerDefineProperty(this, "newUsername", _descriptor4, this);
      _initializerDefineProperty(this, "errorMessage", _descriptor5, this);
      _initializerDefineProperty(this, "saving", _descriptor6, this);
      _initializerDefineProperty(this, "taken", _descriptor7, this);
      _initializerDefineProperty(this, "maxLength", _descriptor8, this);
      _initializerDefineProperty(this, "minLength", _descriptor9, this);
      _initializerDefineProperty(this, "newUsernameEmpty", _descriptor10, this);
      _initializerDefineProperty(this, "saveDisabled", _descriptor11, this);
    }
    get unchanged() {
      return this.newUsername === this.args.user.username;
    }
    get saveButtonText() {
      return this.saving ? _I18n.default.t("saving") : _I18n.default.t("user.change");
    }
    toggleEditing() {
      this.editing = !this.editing;
      this.newUsername = this.args.user.username;
      this.errorMessage = null;
      this.saving = false;
      this.taken = false;
    }
    async onInput(event) {
      this.newUsername = event.target.value;
      this.taken = false;
      this.errorMessage = null;
      if ((0, _utils.isEmpty)(this.newUsername)) {
        return;
      }
      if (this.newUsername === this.args.user.username) {
        return;
      }
      if (this.newUsername.length < this.minLength) {
        this.errorMessage = _I18n.default.t("user.name.too_short");
        return;
      }
      const result = await _user.default.checkUsername(this.newUsername, undefined, this.args.user.id);
      if (result.errors) {
        this.errorMessage = result.errors.join(" ");
      } else if (result.available === false) {
        this.taken = true;
      }
    }
    changeUsername() {
      return this.dialog.yesNoConfirm({
        title: _I18n.default.t("user.change_username.confirm"),
        didConfirm: async () => {
          this.saving = true;
          try {
            await this.args.user.changeUsername(this.newUsername);
            _url.default.redirectTo((0, _url.userPath)(this.newUsername.toLowerCase() + "/preferences"));
          } catch (e) {
            (0, _ajaxError.popupAjaxError)(e);
          } finally {
            this.saving = false;
          }
        }
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "editing", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "newUsername", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.args.user.username;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "errorMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "saving", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "taken", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "maxLength", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "minLength", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "newUsernameEmpty", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "saveDisabled", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "toggleEditing", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleEditing"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onInput", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "changeUsername", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "changeUsername"), _class.prototype)), _class));
  _exports.default = UsernamePreference;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UsernamePreference);
});