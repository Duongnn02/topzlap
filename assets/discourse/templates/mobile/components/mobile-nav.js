define("discourse/templates/mobile/components/mobile-nav", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.selectedHtml}}
    <li>
      <a href {{on "click" this.toggleExpanded}} class="expander">
        <span class="selection">{{html-safe this.selectedHtml}}</span>
        {{d-icon "caret-down"}}
      </a>
    </li>
  {{/if}}
  <ul class="drop {{if this.expanded 'expanded'}}">
    {{yield}}
  </ul>
  */
  {
    "id": "DftOfT9z",
    "block": "[[[41,[30,0,[\"selectedHtml\"]],[[[1,\"  \"],[10,\"li\"],[12],[1,\"\\n    \"],[11,3],[24,6,\"\"],[24,0,\"expander\"],[4,[38,1],[\"click\",[30,0,[\"toggleExpanded\"]]],null],[12],[1,\"\\n      \"],[10,1],[14,0,\"selection\"],[12],[1,[28,[35,2],[[30,0,[\"selectedHtml\"]]],null]],[13],[1,\"\\n      \"],[1,[28,[35,3],[\"caret-down\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[10,\"ul\"],[15,0,[29,[\"drop \",[52,[30,0,[\"expanded\"]],\"expanded\"]]]],[12],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"],[13]],[\"&default\"],false,[\"if\",\"on\",\"html-safe\",\"d-icon\",\"yield\"]]",
    "moduleName": "discourse/templates/mobile/components/mobile-nav.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});