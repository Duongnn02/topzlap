define("discourse/components/hidden-details", ["exports", "@ember/component", "@ember/template-factory", "@ember/object"], function (_exports, _component, _templateFactory, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.expanded}}
    <DButton
      @action={{action "expand"}}
      @class="btn-link"
      @label={{this.label}}
    />
  {{/unless}}
  {{#if this.expanded}}
    <span class="description" aria-live="assertive">{{this.details}}</span>
  {{/if}}
  */
  {
    "id": "1wq56MIi",
    "block": "[[[41,[51,[30,0,[\"expanded\"]]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,2],[[30,0],\"expand\"],null],\"btn-link\",[30,0,[\"label\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"expanded\"]],[[[1,\"  \"],[10,1],[14,0,\"description\"],[14,\"aria-live\",\"assertive\"],[12],[1,[30,0,[\"details\"]]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"unless\",\"d-button\",\"action\",\"if\"]]",
    "moduleName": "discourse/components/hidden-details.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    expand() {
      this.set("expanded", true);
    }
  }, (_applyDecoratedDescriptor(_obj, "expand", [_object.action], Object.getOwnPropertyDescriptor(_obj, "expand"), _obj)), _obj)));
  _exports.default = _default;
});