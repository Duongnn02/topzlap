define("discourse/components/input-tip", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/lib/icon-library", "@ember/template"], function (_exports, _component, _templateFactory, _computed, _iconLibrary, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/component",0,"discourse-common/lib/icon-library",0,"@ember/template"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.tipReason}}
    {{this.tipIcon}}
    {{this.tipReason}}
  {{/if}}
  */
  {
    "id": "NJB4NWMD",
    "block": "[[[41,[30,0,[\"tipReason\"]],[[[1,\"  \"],[1,[30,0,[\"tipIcon\"]]],[1,\"\\n  \"],[1,[30,0,[\"tipReason\"]]],[1,\"\\n\"]],[]],null]],[],false,[\"if\"]]",
    "moduleName": "discourse/components/input-tip.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    classNameBindings: [":tip", "good", "bad"],
    tipIcon: null,
    tipReason: null,
    bad: (0, _computed.alias)("validation.failed"),
    good: (0, _computed.not)("bad"),
    tipIconHTML() {
      let icon = (0, _iconLibrary.iconHTML)(this.good ? "check" : "times");
      return (0, _template.htmlSafe)(`${icon}`);
    },
    didReceiveAttrs() {
      this._super(...arguments);
      let reason = this.get("validation.reason");
      if (reason) {
        this.set("tipIcon", this.tipIconHTML());
        this.set("tipReason", reason);
      } else {
        this.set("tipIcon", null);
        this.set("tipReason", null);
      }
    }
  }));
  _exports.default = _default;
});