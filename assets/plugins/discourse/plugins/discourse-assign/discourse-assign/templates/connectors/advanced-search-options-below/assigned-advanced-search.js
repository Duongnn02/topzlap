define("discourse/plugins/discourse-assign/discourse-assign/templates/connectors/advanced-search-options-below/assigned-advanced-search", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group">
    <label class="control-label" for="search-assigned-to">{{i18n
        "search.advanced.assigned.label"
      }}</label>
    <div class="controls">
      <EmailGroupUserChooser
        @value={{searchedTerms.assigned}}
        @onChange={{action "onChangeAssigned"}}
        @options={{hash
          maximum=1
          excludeCurrentUser=false
          includeGroups=true
          customSearchOptions=(hash assignableGroups=true)
        }}
      />
    </div>
  </div>
  */
  {
    "id": "JYyzDzUm",
    "block": "[[[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"search-assigned-to\"],[12],[1,[28,[35,0],[\"search.advanced.assigned.label\"],null]],[13],[1,\"\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@value\",\"@onChange\",\"@options\"],[[33,2,[\"assigned\"]],[28,[37,3],[[30,0],\"onChangeAssigned\"],null],[28,[37,4],null,[[\"maximum\",\"excludeCurrentUser\",\"includeGroups\",\"customSearchOptions\"],[1,false,true,[28,[37,4],null,[[\"assignableGroups\"],[true]]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"email-group-user-chooser\",\"searchedTerms\",\"action\",\"hash\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse-assign/templates/connectors/advanced-search-options-below/assigned-advanced-search.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});