define("discourse/components/user-summary-section", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <h3 class="stats-title">{{i18n (concat "user.summary." @title)}}</h3>
  {{yield}}
  */
  {
    "id": "jWdvCjy7",
    "block": "[[[10,\"h3\"],[14,0,\"stats-title\"],[12],[1,[28,[35,0],[[28,[37,1],[\"user.summary.\",[30,1]],null]],null]],[13],[1,\"\\n\"],[18,2,null]],[\"@title\",\"&default\"],false,[\"i18n\",\"concat\",\"yield\"]]",
    "moduleName": "discourse/components/user-summary-section.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["top-sub-section"]
  }));
  _exports.default = _default;
});