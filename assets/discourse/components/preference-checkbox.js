define("discourse/components/preference-checkbox", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label class="checkbox-label">
    <Input
      @type="checkbox"
      disabled={{this.disabled}}
      @checked={{this.checked}}
    />
    {{this.label}}
  </label>
  */
  {
    "id": "RADlXyEF",
    "block": "[[[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n  \"],[8,[39,0],[[16,\"disabled\",[30,0,[\"disabled\"]]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"checked\"]]]],null],[1,\"\\n  \"],[1,[30,0,[\"label\"]]],[1,\"\\n\"],[13]],[],false,[\"input\"]]",
    "moduleName": "discourse/components/preference-checkbox.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("labelKey"), (_obj = {
    classNames: ["controls"],
    label(labelKey) {
      return _I18n.default.t(labelKey);
    },
    change() {
      const warning = this.warning;
      if (warning && this.checked) {
        this.warning();
        return false;
      }
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "label", [_dec], Object.getOwnPropertyDescriptor(_obj, "label"), _obj)), _obj))));
  _exports.default = _default;
});