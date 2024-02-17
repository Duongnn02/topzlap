define("discourse/components/save-controls", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @action={{this.action}}
    @disabled={{this.buttonDisabled}}
    @label={{this.savingText}}
    @class="btn-primary save-changes"
  />
  {{#if this.saved}}
    <span class="saved">{{i18n "saved"}}</span>
  {{/if}}
  
  {{yield}}
  */
  {
    "id": "qJGez82Q",
    "block": "[[[8,[39,0],null,[[\"@action\",\"@disabled\",\"@label\",\"@class\"],[[30,0,[\"action\"]],[30,0,[\"buttonDisabled\"]],[30,0,[\"savingText\"]],\"btn-primary save-changes\"]],null],[1,\"\\n\"],[41,[30,0,[\"saved\"]],[[[1,\"  \"],[10,1],[14,0,\"saved\"],[12],[1,[28,[35,2],[\"saved\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[18,1,null]],[\"&default\"],false,[\"d-button\",\"if\",\"i18n\",\"yield\"]]",
    "moduleName": "discourse/components/save-controls.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.isSaving"), (_obj = {
    classNames: ["controls", "save-button"],
    buttonDisabled: (0, _computed.or)("model.isSaving", "saveDisabled"),
    didInsertElement() {
      this._super(...arguments);
      this.set("saved", false);
    },
    savingText(saving) {
      return saving ? "saving" : "save";
    }
  }, (_applyDecoratedDescriptor(_obj, "savingText", [_dec], Object.getOwnPropertyDescriptor(_obj, "savingText"), _obj)), _obj))));
  _exports.default = _default;
});