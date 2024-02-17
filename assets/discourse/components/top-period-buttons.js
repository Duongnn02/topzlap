define("discourse/components/top-period-buttons", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.periods as |p|}}
    <DButton
      @action={{action "changePeriod"}}
      @class="btn-default"
      @actionParam={{p}}
      @translatedLabel={{period-title p}}
    />
  {{/each}}
  */
  {
    "id": "0PmIaPWe",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"periods\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@action\",\"@class\",\"@actionParam\",\"@translatedLabel\"],[[28,[37,3],[[30,0],\"changePeriod\"],null],\"btn-default\",[30,1],[28,[37,4],[[30,1]],null]]],null],[1,\"\\n\"]],[1]],null]],[\"p\"],false,[\"each\",\"-track-array\",\"d-button\",\"action\",\"period-title\"]]",
    "moduleName": "discourse/components/top-period-buttons.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("period"), (_obj = {
    classNames: ["top-title-buttons"],
    periods(period) {
      return this.site.get("periods").filter(p => p !== period);
    },
    actions: {
      changePeriod(p) {
        this.action(p);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "periods", [_dec], Object.getOwnPropertyDescriptor(_obj, "periods"), _obj)), _obj))));
  _exports.default = _default;
});