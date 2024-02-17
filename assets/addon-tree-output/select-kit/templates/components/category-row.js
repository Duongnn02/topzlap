define("select-kit/templates/components/category-row", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.category}}
    <div class="category-status" aria-hidden="true">
      {{#if this.hasParentCategory}}
        {{#unless this.hideParentCategory}}
          {{this.badgeForParentCategory}}
        {{/unless}}
      {{/if}}
      {{this.badgeForCategory}}
    </div>
  
    {{#if this.shouldDisplayDescription}}
      <div class="category-desc" aria-hidden="true">{{dir-span
          this.descriptionText
          htmlSafe="true"
        }}</div>
    {{/if}}
  {{else}}
    {{html-safe this.label}}
  {{/if}}
  */
  {
    "id": "SJjR7jkx",
    "block": "[[[41,[30,0,[\"category\"]],[[[1,\"  \"],[10,0],[14,0,\"category-status\"],[14,\"aria-hidden\",\"true\"],[12],[1,\"\\n\"],[41,[30,0,[\"hasParentCategory\"]],[[[41,[51,[30,0,[\"hideParentCategory\"]]],[[[1,\"        \"],[1,[30,0,[\"badgeForParentCategory\"]]],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[1,[30,0,[\"badgeForCategory\"]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"shouldDisplayDescription\"]],[[[1,\"    \"],[10,0],[14,0,\"category-desc\"],[14,\"aria-hidden\",\"true\"],[12],[1,[28,[35,2],[[30,0,[\"descriptionText\"]]],[[\"htmlSafe\"],[\"true\"]]]],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"  \"],[1,[28,[35,3],[[30,0,[\"label\"]]],null]],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"unless\",\"dir-span\",\"html-safe\"]]",
    "moduleName": "select-kit/templates/components/category-row.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});