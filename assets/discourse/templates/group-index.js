define("discourse/templates/group-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-content">
    <div class="group-members-actions">
  
      {{#if this.canManageGroup}}
        <DButton
          @class="bulk-select"
          @icon="list"
          @action={{action "toggleBulkSelect"}}
          @title="topics.bulk.toggle"
        />
      {{/if}}
  
      {{#if this.model.can_see_members}}
        <TextField
          @value={{this.filterInput}}
          @placeholderKey={{this.filterPlaceholder}}
          @autocomplete="off"
          @class="group-username-filter no-blur"
        />
      {{/if}}
  
      {{#if this.canManageGroup}}
  
        {{#if this.isBulk}}
          <span class="bulk-select-buttons-wrap">
            {{#if this.bulkSelection}}
              <BulkGroupMemberDropdown
                @bulkSelection={{this.bulkSelection}}
                @canAdminGroup={{this.model.can_admin_group}}
                @canEditGroup={{this.model.can_edit_group}}
                @onChange={{action "actOnSelection" this.bulkSelection}}
              />
  
              <DButton
                @action={{action "bulkClearAll"}}
                @label="topics.bulk.clear_all"
                @icon="far-square"
                @class="bulk-select-clear"
              />
            {{/if}}
  
            <DButton
              @action={{action "bulkSelectAll"}}
              @label="topics.bulk.select_all"
              @icon="check-square"
              @class="bulk-select-all"
            />
  
          </span>
        {{/if}}
  
        <div class="group-members-manage">
          <DButton
            @icon="plus"
            @action={{route-action "showAddMembersModal"}}
            @label="groups.manage.add_members"
            @class="btn-default group-members-add"
          />
  
          {{#if this.currentUser.can_invite_to_forum}}
            <DButton
              @icon="plus"
              @action={{route-action "showInviteModal"}}
              @label="groups.manage.invite_members"
              @class="btn-default group-members-add"
            />
          {{/if}}
        </div>
      {{/if}}
    </div>
  
    {{#if this.hasMembers}}
      <LoadMore
        @selector=".directory-table .directory-table__cell"
        @action={{action "loadMore"}}
      >
  
        <ResponsiveTable
          @className="group-members
            {{if this.isBulk 'sticky-header' ''}}
            {{if this.canManageGroup 'group-members--can-manage' ''}}"
        >
          <:header>
            <TableHeaderToggle
              @order={{this.order}}
              @asc={{this.asc}}
              @field="username_lower"
              @labelKey="username"
              @class="username"
              @automatic={{true}}
              @colspan="2"
            />
  
            {{#if this.canManageGroup}}
              <div class="directory-table__column-header"></div>
            {{/if}}
  
            <TableHeaderToggle
              @class="directory-table__column-header"
              @order={{this.order}}
              @asc={{this.asc}}
              @field="added_at"
              @labelKey="groups.member_added"
              @automatic={{true}}
            />
            <TableHeaderToggle
              @class="directory-table__column-header"
              @order={{this.order}}
              @asc={{this.asc}}
              @field="last_posted_at"
              @labelKey="last_post"
              @automatic={{true}}
            />
            <TableHeaderToggle
              @class="directory-table__column-header"
              @order={{this.order}}
              @asc={{this.asc}}
              @field="last_seen_at"
              @labelKey="last_seen"
              @automatic={{true}}
            />
  
            {{#if this.canManageGroup}}
              <div class="directory-table__column-header"></div>
            {{/if}}
          </:header>
  
          <:body>
            {{#each this.model.members as |m|}}
              <div class="directory-table__row">
  
                <div class="directory-table__cell group-member" colspan="2">
                  {{#if this.canManageGroup}}
                    {{#if this.isBulk}}
                      <Input
                        @type="checkbox"
                        class="bulk-select"
                        {{on "click" (action "selectMember" m)}}
                      />
                    {{/if}}
                  {{/if}}
                  <UserInfo
                    @user={{m}}
                    @skipName={{this.skipName}}
                    @showStatus={{true}}
                    @showStatusTooltip={{true}}
                  />
                </div>
  
                {{#if this.canManageGroup}}
                  <div class="directory-table__cell group-owner">
                    {{#if (or m.owner m.primary)}}
                      <span class="directory-table__label">
                        <span>{{i18n "groups.members.status"}}</span>
                      </span>
                    {{/if}}
                    <span class="directory-table__value">
                      {{#if m.owner}}
                        {{d-icon "shield-alt"}}
                        {{i18n "groups.members.owner"}}<br />
                      {{/if}}
                      {{#if m.primary}}
                        {{i18n "groups.members.primary"}}
                      {{/if}}
                    </span>
  
                  </div>
                {{/if}}
                <div class="directory-table__cell">
                  <span class="directory-table__label">
                    <span>{{i18n "groups.member_added"}}</span>
                  </span>
                  <span class="directory-table__value">
                    {{bound-date m.added_at}}
                  </span>
                </div>
                <div
                  class="directory-table__cell{{unless
                      m.last_posted_at
                      '--empty'
                    }}"
                >
                  {{#if m.last_posted_at}}
                    <span class="directory-table__label">
                      <span>{{i18n "last_post"}}</span>
                    </span>
                  {{/if}}
                  <span class="directory-table__value">
                    {{bound-date m.last_posted_at}}
                  </span>
                </div>
                <div
                  class="directory-table__cell{{unless m.last_seen_at '--empty'}}"
                >
                  {{#if m.last_seen_at}}
                    <span class="directory-table__label">
                      <span>{{i18n "last_seen"}}</span>
                    </span>
                  {{/if}}
                  <span class="directory-table__value">
                    {{bound-date m.last_seen_at}}
                  </span>
                </div>
                {{#if this.canManageGroup}}
                  <div class="directory-table__cell member-settings">
                    <GroupMemberDropdown
                      @member={{m}}
                      @canAdminGroup={{this.model.can_admin_group}}
                      @canEditGroup={{this.model.can_edit_group}}
                      @onChange={{action "actOnGroup" m}}
                    />
                    {{! group parameter is used by plugins }}
                  </div>
                {{/if}}
              </div>
            {{/each}}
          </:body>
  
        </ResponsiveTable>
  
      </LoadMore>
  
      <ConditionalLoadingSpinner @condition={{this.loading}} />
    {{else}}
      <br />
  
      <div>{{i18n this.emptyMessageKey}}</div>
    {{/if}}
  </section>
  */
  {
    "id": "NnKCmBRz",
    "block": "[[[10,\"section\"],[14,0,\"user-content\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"group-members-actions\"],[12],[1,\"\\n\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@class\",\"@icon\",\"@action\",\"@title\"],[\"bulk-select\",\"list\",[28,[37,2],[[30,0],\"toggleBulkSelect\"],null],\"topics.bulk.toggle\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_see_members\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@value\",\"@placeholderKey\",\"@autocomplete\",\"@class\"],[[30,0,[\"filterInput\"]],[30,0,[\"filterPlaceholder\"]],\"off\",\"group-username-filter no-blur\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"\\n\"],[41,[30,0,[\"isBulk\"]],[[[1,\"        \"],[10,1],[14,0,\"bulk-select-buttons-wrap\"],[12],[1,\"\\n\"],[41,[30,0,[\"bulkSelection\"]],[[[1,\"            \"],[8,[39,4],null,[[\"@bulkSelection\",\"@canAdminGroup\",\"@canEditGroup\",\"@onChange\"],[[30,0,[\"bulkSelection\"]],[30,0,[\"model\",\"can_admin_group\"]],[30,0,[\"model\",\"can_edit_group\"]],[28,[37,2],[[30,0],\"actOnSelection\",[30,0,[\"bulkSelection\"]]],null]]],null],[1,\"\\n\\n            \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[28,[37,2],[[30,0],\"bulkClearAll\"],null],\"topics.bulk.clear_all\",\"far-square\",\"bulk-select-clear\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[28,[37,2],[[30,0],\"bulkSelectAll\"],null],\"topics.bulk.select_all\",\"check-square\",\"bulk-select-all\"]],null],[1,\"\\n\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"group-members-manage\"],[12],[1,\"\\n        \"],[8,[39,1],null,[[\"@icon\",\"@action\",\"@label\",\"@class\"],[\"plus\",[28,[37,5],[\"showAddMembersModal\"],null],\"groups.manage.add_members\",\"btn-default group-members-add\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\",\"can_invite_to_forum\"]],[[[1,\"          \"],[8,[39,1],null,[[\"@icon\",\"@action\",\"@label\",\"@class\"],[\"plus\",[28,[37,5],[\"showInviteModal\"],null],\"groups.manage.invite_members\",\"btn-default group-members-add\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"hasMembers\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@selector\",\"@action\"],[\".directory-table .directory-table__cell\",[28,[37,2],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n\\n      \"],[8,[39,7],null,[[\"@className\"],[[29,[\"group-members\\n          \",[52,[30,0,[\"isBulk\"]],\"sticky-header\",\"\"],\"\\n          \",[52,[30,0,[\"canManageGroup\"]],\"group-members--can-manage\",\"\"]]]]],[[\"header\",\"body\"],[[[[1,\"\\n          \"],[8,[39,8],null,[[\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@class\",\"@automatic\",\"@colspan\"],[[30,0,[\"order\"]],[30,0,[\"asc\"]],\"username_lower\",\"username\",\"username\",true,\"2\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"            \"],[10,0],[14,0,\"directory-table__column-header\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,8],null,[[\"@class\",\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@automatic\"],[\"directory-table__column-header\",[30,0,[\"order\"]],[30,0,[\"asc\"]],\"added_at\",\"groups.member_added\",true]],null],[1,\"\\n          \"],[8,[39,8],null,[[\"@class\",\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@automatic\"],[\"directory-table__column-header\",[30,0,[\"order\"]],[30,0,[\"asc\"]],\"last_posted_at\",\"last_post\",true]],null],[1,\"\\n          \"],[8,[39,8],null,[[\"@class\",\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@automatic\"],[\"directory-table__column-header\",[30,0,[\"order\"]],[30,0,[\"asc\"]],\"last_seen_at\",\"last_seen\",true]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"            \"],[10,0],[14,0,\"directory-table__column-header\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"        \"]],[]],[[[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"model\",\"members\"]]],null]],null],null,[[[1,\"            \"],[10,0],[14,0,\"directory-table__row\"],[12],[1,\"\\n\\n              \"],[10,0],[14,0,\"directory-table__cell group-member\"],[14,\"colspan\",\"2\"],[12],[1,\"\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[41,[30,0,[\"isBulk\"]],[[[1,\"                    \"],[8,[39,11],[[24,0,\"bulk-select\"],[4,[38,12],[\"click\",[28,[37,2],[[30,0],\"selectMember\",[30,1]],null]],null]],[[\"@type\"],[\"checkbox\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"                \"],[8,[39,13],null,[[\"@user\",\"@skipName\",\"@showStatus\",\"@showStatusTooltip\"],[[30,1],[30,0,[\"skipName\"]],true,true]],null],[1,\"\\n              \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"                \"],[10,0],[14,0,\"directory-table__cell group-owner\"],[12],[1,\"\\n\"],[41,[28,[37,14],[[30,1,[\"owner\"]],[30,1,[\"primary\"]]],null],[[[1,\"                    \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                      \"],[10,1],[12],[1,[28,[35,15],[\"groups.members.status\"],null]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"                  \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n\"],[41,[30,1,[\"owner\"]],[[[1,\"                      \"],[1,[28,[35,16],[\"shield-alt\"],null]],[1,\"\\n                      \"],[1,[28,[35,15],[\"groups.members.owner\"],null]],[10,\"br\"],[12],[13],[1,\"\\n\"]],[]],null],[41,[30,1,[\"primary\"]],[[[1,\"                      \"],[1,[28,[35,15],[\"groups.members.primary\"],null]],[1,\"\\n\"]],[]],null],[1,\"                  \"],[13],[1,\"\\n\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[10,0],[14,0,\"directory-table__cell\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                  \"],[10,1],[12],[1,[28,[35,15],[\"groups.member_added\"],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n                  \"],[1,[28,[35,17],[[30,1,[\"added_at\"]]],null]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[15,0,[29,[\"directory-table__cell\",[52,[51,[30,1,[\"last_posted_at\"]]],\"--empty\"]]]],[12],[1,\"\\n\"],[41,[30,1,[\"last_posted_at\"]],[[[1,\"                  \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                    \"],[10,1],[12],[1,[28,[35,15],[\"last_post\"],null]],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n                  \"],[1,[28,[35,17],[[30,1,[\"last_posted_at\"]]],null]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[15,0,[29,[\"directory-table__cell\",[52,[51,[30,1,[\"last_seen_at\"]]],\"--empty\"]]]],[12],[1,\"\\n\"],[41,[30,1,[\"last_seen_at\"]],[[[1,\"                  \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                    \"],[10,1],[12],[1,[28,[35,15],[\"last_seen\"],null]],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n                  \"],[1,[28,[35,17],[[30,1,[\"last_seen_at\"]]],null]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"],[41,[30,0,[\"canManageGroup\"]],[[[1,\"                \"],[10,0],[14,0,\"directory-table__cell member-settings\"],[12],[1,\"\\n                  \"],[8,[39,19],null,[[\"@member\",\"@canAdminGroup\",\"@canEditGroup\",\"@onChange\"],[[30,1],[30,0,[\"model\",\"can_admin_group\"]],[30,0,[\"model\",\"can_edit_group\"]],[28,[37,2],[[30,0],\"actOnGroup\",[30,1]],null]]],null],[1,\"\\n\"],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"]],[]]]]],[1,\"\\n\\n    \"]],[]]]]],[1,\"\\n\\n    \"],[8,[39,20],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,\"br\"],[12],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,[28,[35,15],[[30,0,[\"emptyMessageKey\"]]],null]],[13],[1,\"\\n\"]],[]]],[13]],[\"m\"],false,[\"if\",\"d-button\",\"action\",\"text-field\",\"bulk-group-member-dropdown\",\"route-action\",\"load-more\",\"responsive-table\",\"table-header-toggle\",\"each\",\"-track-array\",\"input\",\"on\",\"user-info\",\"or\",\"i18n\",\"d-icon\",\"bound-date\",\"unless\",\"group-member-dropdown\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/group-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});