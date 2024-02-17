define("discourse/components/conditional-loading-section", ["exports", "@ember/component", "@ember/template-factory", "I18n"], function (_exports, _component, _templateFactory, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.isLoading}}
    <span class="title">{{this.title}}</span>
    <div class="spinner {{this.size}}"></div>
  {{else}}
    {{yield}}
  {{/if}}
  */
  {
    "id": "liv03Qpv",
    "block": "[[[41,[30,0,[\"isLoading\"]],[[[1,\"  \"],[10,1],[14,0,\"title\"],[12],[1,[30,0,[\"title\"]]],[13],[1,\"\\n  \"],[10,0],[15,0,[29,[\"spinner \",[30,0,[\"size\"]]]]],[12],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[18,1,null],[1,\"\\n\"]],[]]]],[\"&default\"],false,[\"if\",\"yield\"]]",
    "moduleName": "discourse/components/conditional-loading-section.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["conditional-loading-section"],
    classNameBindings: ["isLoading"],
    isLoading: false,
    title: _I18n.default.t("conditional_loading_section.loading")
  }));
  _exports.default = _default;
});