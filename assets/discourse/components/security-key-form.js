define("discourse/components/security-key-form", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/models/user"], function (_exports, _component, _templateFactory, _object, _user) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/models/user"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div id="security-key">
    <DButton
      @action={{this.action}}
      @icon="key"
      @id="security-key-authenticate-button"
      @label="login.security_key_authenticate"
      @type="button"
      @class="btn btn-large btn-primary"
    />
    <p>
      {{#if this.otherMethodAllowed}}
        <a
          href
          class="toggle-second-factor-method"
          {{on "click" this.useAnotherMethod}}
        >{{i18n "login.security_key_alternative"}}</a>
      {{/if}}
    </p>
  </div>
  */
  {
    "id": "bgfmJjpU",
    "block": "[[[10,0],[14,1,\"security-key\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@action\",\"@icon\",\"@id\",\"@label\",\"@type\",\"@class\"],[[30,0,[\"action\"]],\"key\",\"security-key-authenticate-button\",\"login.security_key_authenticate\",\"button\",\"btn btn-large btn-primary\"]],null],[1,\"\\n  \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"otherMethodAllowed\"]],[[[1,\"      \"],[11,3],[24,6,\"\"],[24,0,\"toggle-second-factor-method\"],[4,[38,2],[\"click\",[30,0,[\"useAnotherMethod\"]]],null],[12],[1,[28,[35,3],[\"login.security_key_alternative\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-button\",\"if\",\"on\",\"i18n\"]]",
    "moduleName": "discourse/components/security-key-form.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    useAnotherMethod(event) {
      event?.preventDefault();
      this.set("showSecurityKey", false);
      this.set("showSecondFactor", true);
      this.set("secondFactorMethod", _user.SECOND_FACTOR_METHODS.TOTP);
    }
  }, (_applyDecoratedDescriptor(_obj, "useAnotherMethod", [_object.action], Object.getOwnPropertyDescriptor(_obj, "useAnotherMethod"), _obj)), _obj)));
  _exports.default = _default;
});