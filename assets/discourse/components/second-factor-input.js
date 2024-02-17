define("discourse/components/second-factor-input", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/user", "discourse-common/utils/decorators", "@ember/object"], function (_exports, _component, _templateFactory, _user, _decorators, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/models/user",0,"discourse-common/utils/decorators",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <TextField
    @value={{this.value}}
    @type={{this.type}}
    @pattern={{this.pattern}}
    @maxlength={{this.maxlength}}
    @class="second-factor-token-input"
    @id={{this.inputId}}
    @autocapitalize="off"
    @autocomplete="one-time-code"
    @autocorrect="off"
    @autofocus="autofocus"
    @placeholder={{this.placeholder}}
    @input={{action "onInput"}}
  />
  */
  {
    "id": "JL+fj278",
    "block": "[[[8,[39,0],null,[[\"@value\",\"@type\",\"@pattern\",\"@maxlength\",\"@class\",\"@id\",\"@autocapitalize\",\"@autocomplete\",\"@autocorrect\",\"@autofocus\",\"@placeholder\",\"@input\"],[[30,0,[\"value\"]],[30,0,[\"type\"]],[30,0,[\"pattern\"]],[30,0,[\"maxlength\"]],\"second-factor-token-input\",[30,0,[\"inputId\"]],\"off\",\"one-time-code\",\"off\",\"autofocus\",[30,0,[\"placeholder\"]],[28,[37,1],[[30,0],\"onInput\"],null]]],null]],[],false,[\"text-field\",\"action\"]]",
    "moduleName": "discourse/components/second-factor-input.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("secondFactorMethod"), _dec2 = (0, _decorators.default)("secondFactorMethod"), _dec3 = (0, _decorators.default)("secondFactorMethod"), (_obj = {
    type(secondFactorMethod) {
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP) {
        return "tel";
      }
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.BACKUP_CODE) {
        return "text";
      }
    },
    pattern(secondFactorMethod) {
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP) {
        return "[0-9]{6}";
      }
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.BACKUP_CODE) {
        return "[a-z0-9]{16}";
      }
    },
    maxlength(secondFactorMethod) {
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.TOTP) {
        return "6";
      }
      if (secondFactorMethod === _user.SECOND_FACTOR_METHODS.BACKUP_CODE) {
        return "32";
      }
    },
    onInput() {
      if (this.onTokenInput) {
        this.onTokenInput(...arguments);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "type", [_dec], Object.getOwnPropertyDescriptor(_obj, "type"), _obj), _applyDecoratedDescriptor(_obj, "pattern", [_dec2], Object.getOwnPropertyDescriptor(_obj, "pattern"), _obj), _applyDecoratedDescriptor(_obj, "maxlength", [_dec3], Object.getOwnPropertyDescriptor(_obj, "maxlength"), _obj), _applyDecoratedDescriptor(_obj, "onInput", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onInput"), _obj)), _obj))));
  _exports.default = _default;
});