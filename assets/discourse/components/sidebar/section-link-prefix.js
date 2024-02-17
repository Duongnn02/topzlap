define("discourse/components/sidebar/section-link-prefix", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @prefixType}}
    <span
      class={{concat-class
        "sidebar-section-link-prefix"
        @prefixType
        @prefixCSSClass
      }}
      style={{if @prefixColor (html-safe (concat "color: " @prefixColor))}}
    >
      {{#if (eq @prefixType "image")}}
        <img src={{@prefixValue}} class="prefix-image" />
      {{/if}}
  
      {{#if (eq @prefixType "text")}}
        <span class="prefix-text">
          {{@prefixValue}}
        </span>
      {{/if}}
  
      {{#if (eq @prefixType "icon")}}
        {{d-icon @prefixValue class="prefix-icon"}}
      {{/if}}
  
      {{#if (eq @prefixType "span")}}
        <span
          style={{html-safe
            (concat
              "background: linear-gradient(90deg, " @prefixElementColors ")"
            )
          }}
          class="prefix-span"
        ></span>
      {{/if}}
      {{#if @prefixBadge}}
        {{d-icon @prefixBadge class="prefix-badge"}}
      {{/if}}
    </span>
  {{/if}}
  */
  {
    "id": "81bUxSYy",
    "block": "[[[41,[30,1],[[[1,\"  \"],[10,1],[15,0,[28,[37,1],[\"sidebar-section-link-prefix\",[30,1],[30,2]],null]],[15,5,[52,[30,3],[28,[37,2],[[28,[37,3],[\"color: \",[30,3]],null]],null]]],[12],[1,\"\\n\"],[41,[28,[37,4],[[30,1],\"image\"],null],[[[1,\"      \"],[10,\"img\"],[15,\"src\",[30,4]],[14,0,\"prefix-image\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,1],\"text\"],null],[[[1,\"      \"],[10,1],[14,0,\"prefix-text\"],[12],[1,\"\\n        \"],[1,[30,4]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,1],\"icon\"],null],[[[1,\"      \"],[1,[28,[35,5],[[30,4]],[[\"class\"],[\"prefix-icon\"]]]],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,1],\"span\"],null],[[[1,\"      \"],[10,1],[15,5,[28,[37,2],[[28,[37,3],[\"background: linear-gradient(90deg, \",[30,5],\")\"],null]],null]],[14,0,\"prefix-span\"],[12],[13],[1,\"\\n\"]],[]],null],[41,[30,6],[[[1,\"      \"],[1,[28,[35,5],[[30,6]],[[\"class\"],[\"prefix-badge\"]]]],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"@prefixType\",\"@prefixCSSClass\",\"@prefixColor\",\"@prefixValue\",\"@prefixElementColors\",\"@prefixBadge\"],false,[\"if\",\"concat-class\",\"html-safe\",\"concat\",\"eq\",\"d-icon\"]]",
    "moduleName": "discourse/components/sidebar/section-link-prefix.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
  _exports.default = _default;
});