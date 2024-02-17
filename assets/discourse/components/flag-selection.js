define("discourse/components/flag-selection", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _runloop, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/runloop",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.flags as |f|}}
    {{yield f}}
  {{else}}
    {{i18n "flagging.cant"}}
  {{/each}}
  */
  {
    "id": "US7eVXzz",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"flags\"]]],null]],null],null,[[[1,\"  \"],[18,2,[[30,1]]],[1,\"\\n\"]],[1]],[[[1,\"  \"],[1,[28,[35,3],[\"flagging.cant\"],null]],[1,\"\\n\"]],[]]]],[\"f\",\"&default\"],false,[\"each\",\"-track-array\",\"yield\",\"i18n\"]]",
    "moduleName": "discourse/components/flag-selection.hbs",
    "isStrictMode": false
  });
  // Mostly hacks because `flag.hbs` didn't use `radio-button`
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.observes)("nameKey"), (_obj = {
    _selectRadio() {
      this.element.querySelector("input[type='radio']").checked = false;
      const nameKey = this.nameKey;
      if (!nameKey) {
        return;
      }
      const selector = this.element.querySelector("#radio_" + nameKey);
      if (selector) {
        selector.checked = "true";
      }
    },
    selectedChanged() {
      (0, _runloop.next)(this, this._selectRadio);
    }
  }, (_applyDecoratedDescriptor(_obj, "selectedChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectedChanged"), _obj)), _obj))));
  _exports.default = _default;
});