define("discourse/components/edit-category-panel", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildCategoryPanel = buildCategoryPanel;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{component
    this.customComponent
    tab=this.tab
    selectedTab=this.selectedTab
    category=this.category
  }}
  */
  {
    "id": "j67r9u89",
    "block": "[[[46,[30,0,[\"customComponent\"]],null,[[\"tab\",\"selectedTab\",\"category\"],[[30,0,[\"tab\"]],[30,0,[\"selectedTab\"]],[30,0,[\"category\"]]]],null]],[],false,[\"component\"]]",
    "moduleName": "discourse/components/edit-category-panel.hbs",
    "isStrictMode": false
  });
  const EditCategoryPanel = _component.default.extend({});
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, EditCategoryPanel);
  _exports.default = _default;
  function buildCategoryPanel(tab, extras) {
    return EditCategoryPanel.extend({
      activeTab: (0, _computed.equal)("selectedTab", tab),
      classNameBindings: [":edit-category-tab", "activeTab::hide", `:edit-category-tab-${tab}`]
    }, extras || {});
  }
});