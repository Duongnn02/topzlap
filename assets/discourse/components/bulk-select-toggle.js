define("discourse/components/bulk-select-toggle", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse-common/lib/get-owner"], function (_exports, _component, _templateFactory, _object, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @class={{"bulk-select"}}
    @action={{action "toggleBulkSelect"}}
    @icon={{"list"}}
  />
  */
  {
    "id": "PaRJzTlZ",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@action\",\"@icon\"],[\"bulk-select\",[28,[37,1],[[30,0],\"toggleBulkSelect\"],null],\"list\"]],null]],[],false,[\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/bulk-select-toggle.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    parentController: null,
    toggleBulkSelect() {
      const controller = (0, _getOwner.getOwner)(this).lookup(`controller:${this.parentController}`);
      const selection = controller.selected;
      controller.toggleProperty("bulkSelectEnabled");
      selection.clear();
    }
  }, (_applyDecoratedDescriptor(_obj, "toggleBulkSelect", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleBulkSelect"), _obj)), _obj)));
  _exports.default = _default;
});