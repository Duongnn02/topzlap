define("discourse/templates/tag-groups", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <a href="/tags">
    {{d-icon "chevron-left"}}
    <span>{{i18n "tagging.groups.back_btn"}}</span>
  </a>
  
  <div class="container tag-groups-container">
    <h2>{{i18n "tagging.groups.title"}}</h2>
  
    {{#if this.siteSettings.tagging_enabled}}
      {{#if this.model}}
        <div class="tag-groups-sidebar content-list">
          <ul>
            {{#each this.model as |tagGroup|}}
              <li>
                <LinkTo @route="tagGroups.edit" @model={{tagGroup}}>
                  {{tagGroup.name}}
                </LinkTo>
              </li>
            {{/each}}
          </ul>
  
          <DButton
            @class="btn-default"
            @action={{action "newTagGroup"}}
            @icon="plus"
            @label="tagging.groups.new"
          />
        </div>
      {{/if}}
  
      {{outlet}}
    {{else}}
      <div class="tag-group-content">
        <div class="alert info">{{i18n "tagging.groups.disabled"}}</div>
      </div>
    {{/if}}
  
  </div>
  */
  {
    "id": "oPtWdMWC",
    "block": "[[[10,3],[14,6,\"/tags\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"chevron-left\"],null]],[1,\"\\n  \"],[10,1],[12],[1,[28,[35,1],[\"tagging.groups.back_btn\"],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"container tag-groups-container\"],[12],[1,\"\\n  \"],[10,\"h2\"],[12],[1,[28,[35,1],[\"tagging.groups.title\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"tagging_enabled\"]],[[[41,[30,0,[\"model\"]],[[[1,\"      \"],[10,0],[14,0,\"tag-groups-sidebar content-list\"],[12],[1,\"\\n        \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@route\",\"@model\"],[\"tagGroups.edit\",[30,1]]],[[\"default\"],[[[[1,\"\\n                \"],[1,[30,1,[\"name\"]]],[1,\"\\n              \"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\\n        \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-default\",[28,[37,7],[[30,0],\"newTagGroup\"],null],\"plus\",\"tagging.groups.new\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[46,[28,[37,9],null,null],null,null,null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"tag-group-content\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"alert info\"],[12],[1,[28,[35,1],[\"tagging.groups.disabled\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[13]],[\"tagGroup\"],false,[\"d-icon\",\"i18n\",\"if\",\"each\",\"-track-array\",\"link-to\",\"d-button\",\"action\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/tag-groups.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});