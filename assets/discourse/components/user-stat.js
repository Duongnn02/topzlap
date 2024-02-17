define("discourse/components/user-stat", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span class="value" title={{this.rawTitle}}>
    {{#if this.isNumber}}
      {{number @value}}
    {{else if this.isDuration}}
      {{format-duration @value}}
    {{else}}
      {{@value}}
    {{/if}}
  </span>
  <span class="label">
    {{#if @icon}}{{d-icon @icon}}{{/if}}
    {{html-safe (i18n @label count=@value)}}
  </span>
  */
  {
    "id": "9skZDTx3",
    "block": "[[[10,1],[14,0,\"value\"],[15,\"title\",[30,0,[\"rawTitle\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"isNumber\"]],[[[1,\"    \"],[1,[28,[35,1],[[30,1]],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"isDuration\"]],[[[1,\"    \"],[1,[28,[35,2],[[30,1]],null]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[30,1]],[1,\"\\n  \"]],[]]]],[]]],[13],[1,\"\\n\"],[10,1],[14,0,\"label\"],[12],[1,\"\\n  \"],[41,[30,2],[[[1,[28,[35,3],[[30,2]],null]]],[]],null],[1,\"\\n  \"],[1,[28,[35,4],[[28,[37,5],[[30,3]],[[\"count\"],[[30,1]]]]],null]],[1,\"\\n\"],[13]],[\"@value\",\"@icon\",\"@label\"],false,[\"if\",\"number\",\"format-duration\",\"d-icon\",\"html-safe\",\"i18n\"]]",
    "moduleName": "discourse/components/user-stat.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["user-stat"],
    type: "number",
    isNumber: (0, _computed.equal)("type", "number"),
    isDuration: (0, _computed.equal)("type", "duration")
  }));
  _exports.default = _default;
});