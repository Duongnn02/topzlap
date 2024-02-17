define("discourse/templates/review", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable">
    <ul class="nav nav-pills reviewable-title">
      <NavItem @route="review.index" @label="review.view_all" />
      <NavItem @route="review.topics" @label="review.grouped_by_topic" />
      {{#if this.currentUser.admin}}
        <NavItem
          @route="review.settings"
          @label="review.settings.title"
          @icon="wrench"
        />
      {{/if}}
    </ul>
  
    {{outlet}}
  </div>
  */
  {
    "id": "CQmO7udB",
    "block": "[[[10,0],[14,0,\"reviewable\"],[12],[1,\"\\n  \"],[10,\"ul\"],[14,0,\"nav nav-pills reviewable-title\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\",\"@label\"],[\"review.index\",\"review.view_all\"]],null],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\",\"@label\"],[\"review.topics\",\"review.grouped_by_topic\"]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"admin\"]],[[[1,\"      \"],[8,[39,0],null,[[\"@route\",\"@label\",\"@icon\"],[\"review.settings\",\"review.settings.title\",\"wrench\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[46,[28,[37,3],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"nav-item\",\"if\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/review.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});