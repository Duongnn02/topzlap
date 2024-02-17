define("discourse/components/modal-panel", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{component
    this.panelComponent
    panel=this.panel
    close=(route-action "closeModal")
  }}
  */
  {
    "id": "EsquPdWp",
    "block": "[[[46,[30,0,[\"panelComponent\"]],null,[[\"panel\",\"close\"],[[30,0,[\"panel\"]],[28,[37,1],[\"closeModal\"],null]]],null]],[],false,[\"component\",\"route-action\"]]",
    "moduleName": "discourse/components/modal-panel.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    panel: null,
    panelComponent: (0, _computed.fmt)("panel.id", "%@-panel"),
    classNameBindings: ["panel.id"],
    classNames: ["modal-panel"]
  }));
  _exports.default = _default;
});