define("discourse/templates/users", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="users">
    <LoadMore
      @selector=".directory-table .directory-table__cell"
      @action={{action "loadMore"}}
    >
      <div class="container">
        <div class="users-directory directory">
          <span>
            <PluginOutlet
              @name="users-top"
              @connectorTagName="div"
              @outletArgs={{hash model=this.model}}
            />
          </span>
          <div class="directory-controls">
            <div class="period-controls">
              <PeriodChooser
                @period={{this.period}}
                @onChange={{action (mut this.period)}}
                @fullDay={{false}}
              />
              {{#if this.lastUpdatedAt}}
                <div class="directory-last-updated">
                  {{i18n "directory.last_updated"}}
                  {{this.lastUpdatedAt}}
                </div>
              {{/if}}
            </div>
            <div class="inline-form">
              <label class="total-rows">
                {{#if this.model.totalRows}}
                  {{i18n "directory.total_rows" count=this.model.totalRows}}
                {{/if}}
              </label>
              <Input
                @value={{readonly this.nameInput}}
                placeholder={{i18n "directory.filter_name"}}
                class="filter-name no-blur"
                {{on
                  "input"
                  (action "onUsernameFilterChanged" value="target.value")
                }}
              />
              {{#if this.showGroupFilter}}
                <ComboBox
                  @class="directory-group-selector"
                  @value={{this.group}}
                  @content={{this.groupOptions}}
                  @onChange={{action this.groupChanged}}
                  @options={{hash none="directory.group.all"}}
                />
              {{/if}}
              {{#if this.currentUser.staff}}
                <DButton
                  @icon="wrench"
                  @action={{action "showEditColumnsModal"}}
                  @class="btn-default open-edit-columns-btn"
                />
              {{/if}}
              <PluginOutlet
                @name="users-directory-controls"
                @outletArgs={{hash model=this.model}}
              />
            </div>
          </div>
  
          <ConditionalLoadingSpinner @condition={{this.isLoading}}>
            {{#if this.model.length}}
              <DirectoryTable
                @items={{this.model}}
                @columns={{this.columns}}
                @showTimeRead={{this.showTimeRead}}
                @order={{this.order}}
                @asc={{this.asc}}
              />
              <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
            {{else}}
              <div class="clearfix"></div>
              <p>{{i18n "directory.no_results"}}</p>
            {{/if}}
          </ConditionalLoadingSpinner>
  
        </div>
      </div>
    </LoadMore>
  </DSection>
  */
  {
    "id": "8aFjtA+j",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"users\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@selector\",\"@action\"],[\".directory-table .directory-table__cell\",[28,[37,2],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"users-directory directory\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"users-top\",\"div\",[28,[37,4],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"directory-controls\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"period-controls\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@period\",\"@onChange\",\"@fullDay\"],[[30,0,[\"period\"]],[28,[37,2],[[30,0],[28,[37,6],[[30,0,[\"period\"]]],null]],null],false]],null],[1,\"\\n\"],[41,[30,0,[\"lastUpdatedAt\"]],[[[1,\"              \"],[10,0],[14,0,\"directory-last-updated\"],[12],[1,\"\\n                \"],[1,[28,[35,8],[\"directory.last_updated\"],null]],[1,\"\\n                \"],[1,[30,0,[\"lastUpdatedAt\"]]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"inline-form\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"total-rows\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"totalRows\"]],[[[1,\"                \"],[1,[28,[35,8],[\"directory.total_rows\"],[[\"count\"],[[30,0,[\"model\",\"totalRows\"]]]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n            \"],[8,[39,9],[[16,\"placeholder\",[28,[37,8],[\"directory.filter_name\"],null]],[24,0,\"filter-name no-blur\"],[4,[38,11],[\"input\",[28,[37,2],[[30,0],\"onUsernameFilterChanged\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\"],[[28,[37,10],[[30,0,[\"nameInput\"]]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"showGroupFilter\"]],[[[1,\"              \"],[8,[39,12],null,[[\"@class\",\"@value\",\"@content\",\"@onChange\",\"@options\"],[\"directory-group-selector\",[30,0,[\"group\"]],[30,0,[\"groupOptions\"]],[28,[37,2],[[30,0],[30,0,[\"groupChanged\"]]],null],[28,[37,4],null,[[\"none\"],[\"directory.group.all\"]]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"              \"],[8,[39,13],null,[[\"@icon\",\"@action\",\"@class\"],[\"wrench\",[28,[37,2],[[30,0],\"showEditColumnsModal\"],null],\"btn-default open-edit-columns-btn\"]],null],[1,\"\\n\"]],[]],null],[1,\"            \"],[8,[39,3],null,[[\"@name\",\"@outletArgs\"],[\"users-directory-controls\",[28,[37,4],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[8,[39,14],null,[[\"@condition\"],[[30,0,[\"isLoading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"length\"]],[[[1,\"            \"],[8,[39,15],null,[[\"@items\",\"@columns\",\"@showTimeRead\",\"@order\",\"@asc\"],[[30,0,[\"model\"]],[30,0,[\"columns\"]],[30,0,[\"showTimeRead\"]],[30,0,[\"order\"]],[30,0,[\"asc\"]]]],null],[1,\"\\n            \"],[8,[39,14],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n            \"],[10,2],[12],[1,[28,[35,8],[\"directory.no_results\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"        \"]],[]]]]],[1,\"\\n\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"load-more\",\"action\",\"plugin-outlet\",\"hash\",\"period-chooser\",\"mut\",\"if\",\"i18n\",\"input\",\"readonly\",\"on\",\"combo-box\",\"d-button\",\"conditional-loading-spinner\",\"directory-table\"]]",
    "moduleName": "discourse/templates/users.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});