define("discourse/plugins/discourse-solved/discourse/templates/connectors/bread-crumbs-right/solved-status-filter", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.solved_enabled}}
    <ComboBox
      @class="solved-status-filter"
      @content={{statuses}}
      @value={{status}}
      @valueProperty="value"
      @options={{hash caretDownIcon="caret-right" caretUpIcon="caret-down"}}
      @onChange={{(action "changeStatus")}}
    />
  {{/if}}
  */
  {
    "id": "l24GyaFM",
    "block": "[[[41,[33,1,[\"solved_enabled\"]],[[[1,\"  \"],[8,[39,2],null,[[\"@class\",\"@content\",\"@value\",\"@valueProperty\",\"@options\",\"@onChange\"],[\"solved-status-filter\",[99,3,[\"@content\"]],[99,4,[\"@value\"]],\"value\",[28,[37,5],null,[[\"caretDownIcon\",\"caretUpIcon\"],[\"caret-right\",\"caret-down\"]]],[28,[37,6],[[30,0],\"changeStatus\"],null]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"siteSettings\",\"combo-box\",\"statuses\",\"status\",\"hash\",\"action\"]]",
    "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/bread-crumbs-right/solved-status-filter.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});