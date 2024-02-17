define("discourse/components/tap-tile", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse/lib/computed"], function (_exports, _component, _templateFactory, _computed, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/component",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.icon}}
    {{d-icon this.icon}}
  {{/if}}
  {{yield}}
  */
  {
    "id": "YzzhQB97",
    "block": "[[[41,[30,0,[\"icon\"]],[[[1,\"  \"],[1,[28,[35,1],[[30,0,[\"icon\"]]],null]],[1,\"\\n\"]],[]],null],[18,1,null]],[\"&default\"],false,[\"if\",\"d-icon\",\"yield\"]]",
    "moduleName": "discourse/components/tap-tile.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    init() {
      this._super(...arguments);
      this.set("elementId", `tap_tile_${this.tileId}`);
    },
    classNames: ["tap-tile"],
    classNameBindings: ["active"],
    attributeBindings: ["role", "ariaPressed", "tabIndex"],
    role: "button",
    tabIndex: 0,
    ariaPressed: (0, _computed.reads)("active"),
    click() {
      this.onChange(this.tileId);
    },
    keyDown(e) {
      if (e.key === "Enter") {
        this.onChange(this.tileId);
      }
    },
    active: (0, _computed2.propertyEqual)("activeTile", "tileId")
  }));
  _exports.default = _default;
});