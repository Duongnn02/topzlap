define("discourse/components/footer-message", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.education}}<div class="education">{{html-safe
        this.education
      }}</div>{{/if}}
  <h3>
    {{this.message}}
    {{yield}}
  </h3>
  */
  {
    "id": "GDfczIhQ",
    "block": "[[[41,[30,0,[\"education\"]],[[[10,0],[14,0,\"education\"],[12],[1,[28,[35,1],[[30,0,[\"education\"]]],null]],[13]],[]],null],[1,\"\\n\"],[10,\"h3\"],[12],[1,\"\\n  \"],[1,[30,0,[\"message\"]]],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"],[13]],[\"&default\"],false,[\"if\",\"html-safe\",\"yield\"]]",
    "moduleName": "discourse/components/footer-message.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["footer-message"]
  }));
  _exports.default = _default;
});