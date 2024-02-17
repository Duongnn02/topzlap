define("discourse/templates/group-requests", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
      <TextField
        @value={{this.filterInput}}
        @placeholderKey={{this.filterPlaceholder}}
        @class="group-username-filter no-blur"
      />
    </div>
  
    {{#if this.hasRequesters}}
      <LoadMore
        @selector=".directory-table .directory-table__cell"
        @action={{action "loadMore"}}
      >
        <ResponsiveTable @className="group-members group-members__requests">
          <:header>
            <TableHeaderToggle
              @class="username"
              @order={{this.order}}
              @asc={{this.asc}}
              @field="username_lower"
              @labelKey="username"
              @automatic={{true}}
            />
            <TableHeaderToggle
              @order={{this.order}}
              @asc={{this.asc}}
              @field="requested_at"
              @labelKey="groups.member_requested"
              @automatic={{true}}
            />
            <div
              class="directory-table__column-header group-request-reason__column-header"
            >{{i18n "groups.requests.reason"}}</div>
            <div class="directory-table__column-header"></div>
          </:header>
          <:body>
            {{#each this.model.requesters as |m|}}
              <div class="directory-table__row">
                <div class="directory-table__cell group-member">
                  <UserInfo @user={{m}} @skipName={{this.skipName}} />
                </div>
                <div class="directory-table__cell">
                  <span class="directory-table__label">
                    <span>{{i18n "groups.member_requested"}}</span>
                  </span>
                  <span class="directory-table__value">
                    <span>{{bound-date m.requested_at}}</span>
                  </span>
                </div>
                <div class="directory-table__cell group-request-reason__content">
                  <span class="directory-table__label">
                    <span>{{i18n "groups.requests.reason"}}</span>
                  </span>
                  <span class="directory-table__value">
                    {{m.reason}}
                  </span>
                </div>
                <div class="directory-table__cell group-accept-deny-buttons">
                  {{#if m.request_undone}}
                    {{i18n "groups.requests.undone"}}
                  {{else if m.request_accepted}}
                    {{i18n "groups.requests.accepted"}}
                    <DButton
                      @action={{action "undoAcceptRequest"}}
                      @actionParam={{m}}
                      @label="groups.requests.undo"
                    />
                  {{else if m.request_denied}}
                    {{i18n "groups.requests.denied"}}
                  {{else}}
                    <DButton
                      @action={{action "acceptRequest"}}
                      @actionParam={{m}}
                      @label="groups.requests.accept"
                      @class="btn-primary"
                    />
                    <DButton
                      @action={{action "denyRequest"}}
                      @actionParam={{m}}
                      @label="groups.requests.deny"
                      @class="btn-danger"
                    />
                  {{/if}}
                </div>
              </div>
            {{/each}}
          </:body>
        </ResponsiveTable>
      </LoadMore>
      <ConditionalLoadingSpinner @condition={{this.loading}} />
    {{else}}
      <div>{{i18n "groups.empty.requests"}}</div>
    {{/if}}
  </section>
  */
  {
    "id": "Rg8lGJhr",
    "block": "[[[10,\"section\"],[14,0,\"user-content\"],[12],[1,\"\\n\\n  \"],[10,0],[14,0,\"group-members-actions\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@value\",\"@placeholderKey\",\"@class\"],[[30,0,[\"filterInput\"]],[30,0,[\"filterPlaceholder\"]],\"group-username-filter no-blur\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"hasRequesters\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@selector\",\"@action\"],[\".directory-table .directory-table__cell\",[28,[37,3],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,4],null,[[\"@className\"],[\"group-members group-members__requests\"]],[[\"header\",\"body\"],[[[[1,\"\\n          \"],[8,[39,5],null,[[\"@class\",\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@automatic\"],[\"username\",[30,0,[\"order\"]],[30,0,[\"asc\"]],\"username_lower\",\"username\",true]],null],[1,\"\\n          \"],[8,[39,5],null,[[\"@order\",\"@asc\",\"@field\",\"@labelKey\",\"@automatic\"],[[30,0,[\"order\"]],[30,0,[\"asc\"]],\"requested_at\",\"groups.member_requested\",true]],null],[1,\"\\n          \"],[10,0],[14,0,\"directory-table__column-header group-request-reason__column-header\"],[12],[1,[28,[35,6],[\"groups.requests.reason\"],null]],[13],[1,\"\\n          \"],[10,0],[14,0,\"directory-table__column-header\"],[12],[13],[1,\"\\n        \"]],[]],[[[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"model\",\"requesters\"]]],null]],null],null,[[[1,\"            \"],[10,0],[14,0,\"directory-table__row\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"directory-table__cell group-member\"],[12],[1,\"\\n                \"],[8,[39,9],null,[[\"@user\",\"@skipName\"],[[30,1],[30,0,[\"skipName\"]]]],null],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"directory-table__cell\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                  \"],[10,1],[12],[1,[28,[35,6],[\"groups.member_requested\"],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n                  \"],[10,1],[12],[1,[28,[35,10],[[30,1,[\"requested_at\"]]],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"directory-table__cell group-request-reason__content\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n                  \"],[10,1],[12],[1,[28,[35,6],[\"groups.requests.reason\"],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n                  \"],[1,[30,1,[\"reason\"]]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"directory-table__cell group-accept-deny-buttons\"],[12],[1,\"\\n\"],[41,[30,1,[\"request_undone\"]],[[[1,\"                  \"],[1,[28,[35,6],[\"groups.requests.undone\"],null]],[1,\"\\n\"]],[]],[[[41,[30,1,[\"request_accepted\"]],[[[1,\"                  \"],[1,[28,[35,6],[\"groups.requests.accepted\"],null]],[1,\"\\n                  \"],[8,[39,11],null,[[\"@action\",\"@actionParam\",\"@label\"],[[28,[37,3],[[30,0],\"undoAcceptRequest\"],null],[30,1],\"groups.requests.undo\"]],null],[1,\"\\n\"]],[]],[[[41,[30,1,[\"request_denied\"]],[[[1,\"                  \"],[1,[28,[35,6],[\"groups.requests.denied\"],null]],[1,\"\\n\"]],[]],[[[1,\"                  \"],[8,[39,11],null,[[\"@action\",\"@actionParam\",\"@label\",\"@class\"],[[28,[37,3],[[30,0],\"acceptRequest\"],null],[30,1],\"groups.requests.accept\",\"btn-primary\"]],null],[1,\"\\n                  \"],[8,[39,11],null,[[\"@action\",\"@actionParam\",\"@label\",\"@class\"],[[28,[37,3],[[30,0],\"denyRequest\"],null],[30,1],\"groups.requests.deny\",\"btn-danger\"]],null],[1,\"\\n                \"]],[]]]],[]]]],[]]],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"]],[]]]]],[1,\"\\n    \"]],[]]]]],[1,\"\\n    \"],[8,[39,12],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[12],[1,[28,[35,6],[\"groups.empty.requests\"],null]],[13],[1,\"\\n\"]],[]]],[13]],[\"m\"],false,[\"text-field\",\"if\",\"load-more\",\"action\",\"responsive-table\",\"table-header-toggle\",\"i18n\",\"each\",\"-track-array\",\"user-info\",\"bound-date\",\"d-button\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/group-requests.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});