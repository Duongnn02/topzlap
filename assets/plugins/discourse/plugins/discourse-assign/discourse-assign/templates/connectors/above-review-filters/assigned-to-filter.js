define("discourse/plugins/discourse-assign/discourse-assign/templates/connectors/above-review-filters/assigned-to-filter", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-filter discourse-assign-assign-to-filter">
    <label class="filter-label">{{i18n "discourse_assign.assigned_to"}}</label>
    <EmailGroupUserChooser
      @value={{additionalFilters.assigned_to}}
      @onChange={{action "updateAssignedTo"}}
      autocomplete="off"
      @options={{hash
        maximum=1
        fullWidthWrap=true
        filterPlaceholder=placeholderKey
        includeGroups=false
        groupMembersOf=allowedGroups
      }}
    />
  </div>
  */
  {
    "id": "RBPU7YIo",
    "block": "[[[10,0],[14,0,\"reviewable-filter discourse-assign-assign-to-filter\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,0],[\"discourse_assign.assigned_to\"],null]],[13],[1,\"\\n  \"],[8,[39,1],[[24,\"autocomplete\",\"off\"]],[[\"@value\",\"@onChange\",\"@options\"],[[33,2,[\"assigned_to\"]],[28,[37,3],[[30,0],\"updateAssignedTo\"],null],[28,[37,4],null,[[\"maximum\",\"fullWidthWrap\",\"filterPlaceholder\",\"includeGroups\",\"groupMembersOf\"],[1,true,[33,5],false,[33,6]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"email-group-user-chooser\",\"additionalFilters\",\"action\",\"hash\",\"placeholderKey\",\"allowedGroups\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse-assign/templates/connectors/above-review-filters/assigned-to-filter.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});