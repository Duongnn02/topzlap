define("discourse/components/track-selected", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
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
    <Input @type="checkbox" @checked={{this.selected}} />
  */
  {
    "id": "LQrVbpZQ",
    "block": "[[[8,[39,0],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"selected\"]]]],null]],[],false,[\"input\"]]",
    "moduleName": "discourse/components/track-selected.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.observes)("selected"), (_obj = {
    tagName: "span",
    selectionChanged() {
      const selected = this.selected;
      const list = this.selectedList;
      const id = this.selectedId;
      if (selected) {
        list.addObject(id);
      } else {
        list.removeObject(id);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "selectionChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "selectionChanged"), _obj)), _obj))));
  _exports.default = _default;
});