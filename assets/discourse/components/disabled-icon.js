define("discourse/components/disabled-icon", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{d-icon this.icon class="fa-stack-1x"}}
  
  {{#if this.disabled}}
    {{d-icon "ban" class="fa-stack-2x"}}
  {{/if}}
  */
  {
    "id": "Yu+SPuoe",
    "block": "[[[1,[28,[35,0],[[30,0,[\"icon\"]]],[[\"class\"],[\"fa-stack-1x\"]]]],[1,\"\\n\\n\"],[41,[30,0,[\"disabled\"]],[[[1,\"  \"],[1,[28,[35,0],[\"ban\"],[[\"class\"],[\"fa-stack-2x\"]]]],[1,\"\\n\"]],[]],null]],[],false,[\"d-icon\",\"if\"]]",
    "moduleName": "discourse/components/disabled-icon.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "span",
    classNameBindings: [":fa-stack"]
  }));
  _exports.default = _default;
});