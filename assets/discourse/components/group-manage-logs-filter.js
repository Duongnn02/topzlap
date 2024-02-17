define("discourse/components/group-manage-logs-filter", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.value}}
    <DButton
      @class="btn-default group-manage-logs-filter"
      @action={{action "clearFilter"}}
      @actionParam={{this.type}}
      @icon="times-circle"
      @translatedLabel={{concat this.label ": " this.filterText}}
    />
  {{/if}}
  */
  {
    "id": "iyx+TSc/",
    "block": "[[[41,[30,0,[\"value\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@class\",\"@action\",\"@actionParam\",\"@icon\",\"@translatedLabel\"],[\"btn-default group-manage-logs-filter\",[28,[37,2],[[30,0],\"clearFilter\"],null],[30,0,[\"type\"]],\"times-circle\",[28,[37,3],[[30,0,[\"label\"]],\": \",[30,0,[\"filterText\"]]],null]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-button\",\"action\",\"concat\"]]",
    "moduleName": "discourse/components/group-manage-logs-filter.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("type"), _dec2 = (0, _decorators.default)("value", "type"), (_obj = {
    tagName: "",
    label(type) {
      return _I18n.default.t(`groups.manage.logs.${type}`);
    },
    filterText(value, type) {
      return type === "action" ? _I18n.default.t(`group_histories.actions.${value}`) : value;
    },
    actions: {
      clearFilter(param) {
        this.clearFilter(param);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "label", [_dec], Object.getOwnPropertyDescriptor(_obj, "label"), _obj), _applyDecoratedDescriptor(_obj, "filterText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "filterText"), _obj)), _obj))));
  _exports.default = _default;
});