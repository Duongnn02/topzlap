define("discourse/components/second-factor-form", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "I18n", "discourse/models/user", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _I18n, _user, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"I18n",0,"discourse/models/user",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div id="second-factor">
    <h3>{{this.secondFactorTitle}}</h3>
    {{#if this.optionalText}}
      <p>{{html-safe this.optionalText}}</p>
    {{/if}}
    <p>{{this.secondFactorDescription}}</p>
    {{yield}}
    {{#if this.showToggleMethodLink}}
      <p>
        <a
          href
          class="toggle-second-factor-method"
          {{on "click" this.toggleSecondFactorMethod}}
        >{{i18n this.linkText}}</a>
      </p>
    {{/if}}
  </div>
  */
  {
    "id": "Dk0RIaVF",
    "block": "[[[10,0],[14,1,\"second-factor\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[30,0,[\"secondFactorTitle\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"optionalText\"]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,1],[[30,0,[\"optionalText\"]]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,2],[12],[1,[30,0,[\"secondFactorDescription\"]]],[13],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"],[41,[30,0,[\"showToggleMethodLink\"]],[[[1,\"    \"],[10,2],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"toggle-second-factor-method\"],[4,[38,3],[\"click\",[30,0,[\"toggleSecondFactorMethod\"]]],null],[12],[1,[28,[35,4],[[30,0,[\"linkText\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"&default\"],false,[\"if\",\"html-safe\",\"yield\",\"on\",\"i18n\"]]",
    "moduleName": "discourse/components/second-factor-form.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("secondFactorMethod"), _dec2 = (0, _decorators.default)("secondFactorMethod"), _dec3 = (0, _decorators.default)("secondFactorMethod", "isLogin"), _dec4 = (0, _decorators.default)("backupEnabled", "secondFactorMethod"), (_obj = {
    secondFactorTitle(secondFactorMethod) {
      switch (secondFactorMethod) {
        case _user.SECOND_FACTOR_METHODS.TOTP:
          return _I18n.default.t("login.second_factor_title");
        case _user.SECOND_FACTOR_METHODS.SECURITY_KEY:
          return _I18n.default.t("login.second_factor_title");
        case _user.SECOND_FACTOR_METHODS.BACKUP_CODE:
          return _I18n.default.t("login.second_factor_backup_title");
      }
    },
    secondFactorDescription(secondFactorMethod) {
      switch (secondFactorMethod) {
        case _user.SECOND_FACTOR_METHODS.TOTP:
          return _I18n.default.t("login.second_factor_description");
        case _user.SECOND_FACTOR_METHODS.SECURITY_KEY:
          return _I18n.default.t("login.security_key_description");
        case _user.SECOND_FACTOR_METHODS.BACKUP_CODE:
          return _I18n.default.t("login.second_factor_backup_description");
      }
    },
    linkText(secondFactorMethod, isLogin) {
      if (isLogin) {
        return secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP ? "login.second_factor_backup" : "login.second_factor";
      } else {
        return secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP ? "user.second_factor_backup.use" : "user.second_factor.use";
      }
    },
    showToggleMethodLink(backupEnabled, secondFactorMethod) {
      return backupEnabled && secondFactorMethod !== _user.SECOND_FACTOR_METHODS.SECURITY_KEY;
    },
    toggleSecondFactorMethod(event) {
      event?.preventDefault();
      const secondFactorMethod = this.secondFactorMethod;
      this.set("secondFactorToken", "");
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP) {
        this.set("secondFactorMethod", _user.SECOND_FACTOR_METHODS.BACKUP_CODE);
      } else {
        this.set("secondFactorMethod", _user.SECOND_FACTOR_METHODS.TOTP);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "secondFactorTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "secondFactorTitle"), _obj), _applyDecoratedDescriptor(_obj, "secondFactorDescription", [_dec2], Object.getOwnPropertyDescriptor(_obj, "secondFactorDescription"), _obj), _applyDecoratedDescriptor(_obj, "linkText", [_dec3], Object.getOwnPropertyDescriptor(_obj, "linkText"), _obj), _applyDecoratedDescriptor(_obj, "showToggleMethodLink", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showToggleMethodLink"), _obj), _applyDecoratedDescriptor(_obj, "toggleSecondFactorMethod", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleSecondFactorMethod"), _obj)), _obj))));
  _exports.default = _default;
});