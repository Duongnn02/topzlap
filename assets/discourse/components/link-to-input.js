define("discourse/components/link-to-input", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop"], function (_exports, _component, _templateFactory, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showInput}}
    {{yield}}
  {{else}}
    <a href>
      {{#if this.key}}
        {{i18n this.key}}
      {{/if}}
      {{#if this.icon}}
        {{d-icon this.icon}}
      {{/if}}
    </a>
  {{/if}}
  */
  {
    "id": "O5u4qHpi",
    "block": "[[[41,[30,0,[\"showInput\"]],[[[1,\"  \"],[18,1,null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,3],[14,6,\"\"],[12],[1,\"\\n\"],[41,[30,0,[\"key\"]],[[[1,\"      \"],[1,[28,[35,2],[[30,0,[\"key\"]]],null]],[1,\"\\n\"]],[]],null],[41,[30,0,[\"icon\"]],[[[1,\"      \"],[1,[28,[35,3],[[30,0,[\"icon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]],[\"&default\"],false,[\"if\",\"yield\",\"i18n\",\"d-icon\"]]",
    "moduleName": "discourse/components/link-to-input.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    showInput: false,
    click() {
      this.onClick();
      (0, _runloop.schedule)("afterRender", () => {
        $(this.element).find("input").focus();
      });
      return false;
    }
  }));
  _exports.default = _default;
});