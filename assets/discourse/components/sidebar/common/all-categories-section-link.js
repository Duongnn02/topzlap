define("discourse/components/sidebar/common/all-categories-section-link", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Sidebar::SectionLink
    @linkName="all-categories"
    @content={{i18n "sidebar.all_categories"}}
    @route="discovery.categories"
    @prefixType="icon"
    @prefixValue="list"
  />
  */
  {
    "id": "JEMF5yGF",
    "block": "[[[8,[39,0],null,[[\"@linkName\",\"@content\",\"@route\",\"@prefixType\",\"@prefixValue\"],[\"all-categories\",[28,[37,1],[\"sidebar.all_categories\"],null],\"discovery.categories\",\"icon\",\"list\"]],null]],[],false,[\"sidebar/section-link\",\"i18n\"]]",
    "moduleName": "discourse/components/sidebar/common/all-categories-section-link.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});