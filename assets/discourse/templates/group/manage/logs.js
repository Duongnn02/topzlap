define("discourse/templates/group/manage/logs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.model.logs}}
    <div class="group-manage-logs-controls">
      <GroupManageLogsFilter
        @clearFilter={{action "clearFilter"}}
        @value={{this.filters.action}}
        @type="action"
      />
      <GroupManageLogsFilter
        @clearFilter={{action "clearFilter"}}
        @value={{this.filters.acting_user}}
        @type="acting_user"
      />
      <GroupManageLogsFilter
        @clearFilter={{action "clearFilter"}}
        @value={{this.filters.target_user}}
        @type="target_user"
      />
      <GroupManageLogsFilter
        @clearFilter={{action "clearFilter"}}
        @value={{this.filters.subject}}
        @type="subject"
      />
    </div>
  
    <LoadMore
      @selector=".group-manage-logs .group-manage-logs-row"
      @action={{action "loadMore"}}
    >
      <table class="group-manage-logs">
        <thead>
          <th>{{i18n "groups.manage.logs.action"}}</th>
          <th>{{i18n "groups.manage.logs.acting_user"}}</th>
          <th>{{i18n "groups.manage.logs.target_user"}}</th>
          <th>{{i18n "groups.manage.logs.subject"}}</th>
          <th>{{i18n "groups.manage.logs.when"}}</th>
          <th></th>
        </thead>
  
        <tbody>
          {{#each this.model.logs as |logItem|}}
            <GroupManageLogsRow @log={{logItem}} @filters={{this.filters}} />
          {{/each}}
        </tbody>
      </table>
    </LoadMore>
  
    <ConditionalLoadingSpinner @condition={{this.loading}} />
  {{else}}
    <div>{{i18n "groups.empty.logs"}}</div>
  {{/if}}
  */
  {
    "id": "KIVqXZbF",
    "block": "[[[41,[30,0,[\"model\",\"logs\"]],[[[1,\"  \"],[10,0],[14,0,\"group-manage-logs-controls\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@clearFilter\",\"@value\",\"@type\"],[[28,[37,2],[[30,0],\"clearFilter\"],null],[30,0,[\"filters\",\"action\"]],\"action\"]],null],[1,\"\\n    \"],[8,[39,1],null,[[\"@clearFilter\",\"@value\",\"@type\"],[[28,[37,2],[[30,0],\"clearFilter\"],null],[30,0,[\"filters\",\"acting_user\"]],\"acting_user\"]],null],[1,\"\\n    \"],[8,[39,1],null,[[\"@clearFilter\",\"@value\",\"@type\"],[[28,[37,2],[[30,0],\"clearFilter\"],null],[30,0,[\"filters\",\"target_user\"]],\"target_user\"]],null],[1,\"\\n    \"],[8,[39,1],null,[[\"@clearFilter\",\"@value\",\"@type\"],[[28,[37,2],[[30,0],\"clearFilter\"],null],[30,0,[\"filters\",\"subject\"]],\"subject\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,3],null,[[\"@selector\",\"@action\"],[\".group-manage-logs .group-manage-logs-row\",[28,[37,2],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"table\"],[14,0,\"group-manage-logs\"],[12],[1,\"\\n      \"],[10,\"thead\"],[12],[1,\"\\n        \"],[10,\"th\"],[12],[1,[28,[35,4],[\"groups.manage.logs.action\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[12],[1,[28,[35,4],[\"groups.manage.logs.acting_user\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[12],[1,[28,[35,4],[\"groups.manage.logs.target_user\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[12],[1,[28,[35,4],[\"groups.manage.logs.subject\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[12],[1,[28,[35,4],[\"groups.manage.logs.when\"],null]],[13],[1,\"\\n        \"],[10,\"th\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"model\",\"logs\"]]],null]],null],null,[[[1,\"          \"],[8,[39,7],null,[[\"@log\",\"@filters\"],[[30,1],[30,0,[\"filters\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[39,8],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[12],[1,[28,[35,4],[\"groups.empty.logs\"],null]],[13],[1,\"\\n\"]],[]]]],[\"logItem\"],false,[\"if\",\"group-manage-logs-filter\",\"action\",\"load-more\",\"i18n\",\"each\",\"-track-array\",\"group-manage-logs-row\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/group/manage/logs.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});