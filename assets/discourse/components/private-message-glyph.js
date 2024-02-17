define("discourse/components/private-message-glyph", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.shouldShow}}
    {{#if this.href}}
      <a
        href={{this.href}}
        title={{i18n this.title}}
        aria-label={{i18n this.ariaLabel}}
      >
        <span class="private-message-glyph-wrapper">
          {{d-icon "envelope" class="private-message-glyph"}}
        </span>
      </a>
    {{~else}}
      <span class="private-message-glyph-wrapper">
        {{d-icon "envelope" class="private-message-glyph"}}
      </span>
    {{~/if}}
  {{/if}}
  */
  {
    "id": "N6MsCHwi",
    "block": "[[[41,[30,0,[\"shouldShow\"]],[[[41,[30,0,[\"href\"]],[[[1,\"    \"],[10,3],[15,6,[30,0,[\"href\"]]],[15,\"title\",[28,[37,1],[[30,0,[\"title\"]]],null]],[15,\"aria-label\",[28,[37,1],[[30,0,[\"ariaLabel\"]]],null]],[12],[1,\"\\n      \"],[10,1],[14,0,\"private-message-glyph-wrapper\"],[12],[1,\"\\n        \"],[1,[28,[35,2],[\"envelope\"],[[\"class\"],[\"private-message-glyph\"]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13]],[]],[[[1,\"    \"],[10,1],[14,0,\"private-message-glyph-wrapper\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"envelope\"],[[\"class\"],[\"private-message-glyph\"]]]],[1,\"\\n    \"],[13]],[]]]],[]],null]],[],false,[\"if\",\"i18n\",\"d-icon\"]]",
    "moduleName": "discourse/components/private-message-glyph.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: null,
    href: null,
    title: null,
    ariaLabel: null,
    shouldShow: null
  }));
  _exports.default = _default;
});