define("discourse/components/tap-tile-grid", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{yield (hash activeTile=this.activeTile)}}
  */
  {
    "id": "Jm6vymle",
    "block": "[[[18,1,[[28,[37,1],null,[[\"activeTile\"],[[30,0,[\"activeTile\"]]]]]]]],[\"&default\"],false,[\"yield\",\"hash\"]]",
    "moduleName": "discourse/components/tap-tile-grid.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNames: ["tap-tile-grid"],
    activeTile: null
  }));
  _exports.default = _default;
});