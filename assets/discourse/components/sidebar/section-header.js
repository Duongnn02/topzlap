define("discourse/components/sidebar/section-header", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @collapsable}}
    <DButton
      @title="sidebar.toggle_section"
      @class="sidebar-section-header sidebar-section-header-collapsable btn-flat"
      @action={{@toggleSectionDisplay}}
      @ariaExpanded={{@isExpanded}}
      @ariaControls={{@sidebarSectionContentID}}
    >
      {{yield}}
    </DButton>
  {{else}}
    <span class="sidebar-section-header" title={{i18n "sidebar.toggle_section"}}>
      {{yield}}
    </span>
  {{/if}}
  */
  {
    "id": "xvdKi4ot",
    "block": "[[[41,[30,1],[[[1,\"  \"],[8,[39,1],null,[[\"@title\",\"@class\",\"@action\",\"@ariaExpanded\",\"@ariaControls\"],[\"sidebar.toggle_section\",\"sidebar-section-header sidebar-section-header-collapsable btn-flat\",[30,2],[30,3],[30,4]]],[[\"default\"],[[[[1,\"\\n    \"],[18,5,null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,1],[14,0,\"sidebar-section-header\"],[15,\"title\",[28,[37,3],[\"sidebar.toggle_section\"],null]],[12],[1,\"\\n    \"],[18,5,null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@collapsable\",\"@toggleSectionDisplay\",\"@isExpanded\",\"@sidebarSectionContentID\",\"&default\"],false,[\"if\",\"d-button\",\"yield\",\"i18n\"]]",
    "moduleName": "discourse/components/sidebar/section-header.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});