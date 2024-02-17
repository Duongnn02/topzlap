define("discourse/components/dialog-messages/second-factor-confirm-phrase", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "I18n", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _component, _templateFactory, _component2, _I18n, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"I18n",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{i18n "user.second_factor.delete_confirm_header"}}
  
  <ul>
    {{#each @model.totps as |totp|}}
      <li>{{totp.name}}</li>
    {{/each}}
  
    {{#each @model.security_keys as |sk|}}
      <li>{{sk.name}}</li>
    {{/each}}
  
    {{#if this.currentUser.second_factor_backup_enabled}}
      <li>{{i18n "user.second_factor_backup.title"}}</li>
    {{/if}}
  </ul>
  
  <p>
    {{html-safe
      (i18n
        "user.second_factor.delete_confirm_instruction"
        confirm=this.disabledString
      )
    }}
  </p>
  
  <TextField
    @value={{this.confirmPhraseInput}}
    {{on "input" this.onConfirmPhraseInput}}
    @id="confirm-phrase"
    @autocorrect="off"
    @autocapitalize="off"
  />
  */
  {
    "id": "5+JmmGB3",
    "block": "[[[1,[28,[35,0],[\"user.second_factor.delete_confirm_header\"],null]],[1,\"\\n\\n\"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,1,[\"totps\"]]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[12],[1,[30,2,[\"name\"]]],[13],[1,\"\\n\"]],[2]],null],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,1,[\"security_keys\"]]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[12],[1,[30,3,[\"name\"]]],[13],[1,\"\\n\"]],[3]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"second_factor_backup_enabled\"]],[[[1,\"    \"],[10,\"li\"],[12],[1,[28,[35,0],[\"user.second_factor_backup.title\"],null]],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[1,[28,[35,4],[[28,[37,0],[\"user.second_factor.delete_confirm_instruction\"],[[\"confirm\"],[[30,0,[\"disabledString\"]]]]]],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,5],[[4,[38,6],[\"input\",[30,0,[\"onConfirmPhraseInput\"]]],null]],[[\"@value\",\"@id\",\"@autocorrect\",\"@autocapitalize\"],[[30,0,[\"confirmPhraseInput\"]],\"confirm-phrase\",\"off\",\"off\"]],null]],[\"@model\",\"totp\",\"sk\"],false,[\"i18n\",\"each\",\"-track-array\",\"if\",\"html-safe\",\"text-field\",\"on\"]]",
    "moduleName": "discourse/components/dialog-messages/second-factor-confirm-phrase.hbs",
    "isStrictMode": false
  });
  let SecondFactorConfirmPhrase = (_class = class SecondFactorConfirmPhrase extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "dialog", _descriptor, this);
      _initializerDefineProperty(this, "currentUser", _descriptor2, this);
      _initializerDefineProperty(this, "confirmPhraseInput", _descriptor3, this);
      _defineProperty(this, "disabledString", _I18n.default.t("user.second_factor.disable"));
    }
    onConfirmPhraseInput() {
      if (this.confirmPhraseInput === this.disabledString) {
        this.dialog.set("confirmButtonDisabled", false);
      } else {
        this.dialog.set("confirmButtonDisabled", true);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "confirmPhraseInput", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    }
  }), _applyDecoratedDescriptor(_class.prototype, "onConfirmPhraseInput", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onConfirmPhraseInput"), _class.prototype)), _class);
  _exports.default = SecondFactorConfirmPhrase;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SecondFactorConfirmPhrase);
});