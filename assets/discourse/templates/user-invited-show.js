define("discourse/templates/user-invited-show", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-invites" @tagName="">
    {{#if this.canInviteToForum}}
      <LoadMore
        @class="user-content"
        @id="user-content"
        @selector=".user-invite-list tr"
        @action={{action "loadMore"}}
      >
        <DSection @class="user-additional-controls">
          {{#if this.showSearch}}
            <div class="user-invite-search">
              <form><TextField
                  @value={{this.searchTerm}}
                  @placeholderKey="user.invited.search"
                /></form>
            </div>
          {{/if}}
          <DSection @class="user-invite-buttons">
            <DButton
              @class="btn-default"
              @icon="plus"
              @action={{action "createInvite"}}
              @label="user.invited.create"
            />
            {{#if this.canBulkInvite}}
              {{#if this.siteSettings.allow_bulk_invite}}
                {{#unless this.site.mobileView}}
                  <DButton
                    @class="btn-flat"
                    @icon="upload"
                    @action={{action "createInviteCsv"}}
                    @label="user.invited.bulk_invite.text"
                  />
                {{/unless}}
              {{/if}}
            {{/if}}
            {{#if this.showBulkActionButtons}}
              {{#if this.inviteExpired}}
                {{#if this.removedAll}}
                  <span class="removed-all">
                    {{i18n "user.invited.removed_all"}}
                  </span>
                {{else}}
                  <DButton
                    @icon="times"
                    @action={{action "destroyAllExpired"}}
                    @label="user.invited.remove_all"
                  />
                {{/if}}
              {{/if}}
  
              {{#if this.invitePending}}
                {{#if this.reinvitedAll}}
                  <span class="reinvited-all">
                    <DButton
                      @icon="check"
                      @disabled={{true}}
                      @label="user.invited.reinvited_all"
                    />
                  </span>
                {{else if this.hasEmailInvites}}
                  <DButton
                    @class="btn-default"
                    @icon="sync"
                    @action={{action "reinviteAll"}}
                    @label="user.invited.reinvite_all"
                  />
                {{/if}}
              {{/if}}
            {{/if}}
          </DSection>
        </DSection>
        <section>
          {{#if this.model.invites}}
            {{#if this.inviteRedeemed}}
              <table class="table user-invite-list">
                <thead>
                  <tr>
                    <th>{{i18n "user.invited.user"}}</th>
                    <th>{{i18n "user.invited.redeemed_at"}}</th>
                    {{#if this.model.can_see_invite_details}}
                      <th>{{i18n "user.last_seen"}}</th>
                      <th>{{i18n "user.invited.topics_entered"}}</th>
                      <th>{{i18n "user.invited.posts_read_count"}}</th>
                      <th>{{i18n "user.invited.time_read"}}</th>
                      <th>{{i18n "user.invited.days_visited"}}</th>
                      <th>{{i18n "user.invited.invited_via"}}</th>
                    {{/if}}
                  </tr>
                </thead>
                <tbody>
                  {{#each this.model.invites as |invite|}}
                    <tr>
                      <td>
                        <LinkTo @route="user" @model={{invite.user}}>{{avatar
                            invite.user
                            imageSize="tiny"
                          }}</LinkTo>
                        <LinkTo
                          @route="user"
                          @model={{invite.user}}
                        >{{invite.user.username}}</LinkTo>
                      </td>
                      <td>{{format-date invite.redeemed_at}}</td>
                      {{#if this.model.can_see_invite_details}}
                        <td>{{format-date invite.user.last_seen_at}}</td>
                        <td>{{number invite.user.topics_entered}}</td>
                        <td>{{number invite.user.posts_read_count}}</td>
                        <td>{{format-duration invite.user.time_read}}</td>
                        <td>
                          <span
                            title={{i18n "user.invited.days_visited"}}
                          >{{html-safe invite.user.days_visited}}</span>
                          /
                          <span
                            title={{i18n "user.invited.account_age_days"}}
                          >{{html-safe invite.user.days_since_created}}</span>
                        </td>
                        <td>{{html-safe invite.invite_source}}</td>
                      {{/if}}
                    </tr>
                  {{/each}}
                </tbody>
              </table>
            {{else}}
              <table class="table user-invite-list">
                <thead>
                  <tr>
                    <th>{{i18n "user.invited.invited_via"}}</th>
                    <th>{{i18n "user.invited.sent"}}</th>
                    <th>{{i18n "user.invited.expires_at"}}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {{#each this.model.invites as |invite|}}
                    <tr>
                      <td class="invite-type">
                        <div class="label">{{i18n
                            "user.invited.invited_via"
                          }}</div>
                        {{#if invite.email}}
                          {{d-icon "envelope"}}
                          {{invite.email}}
                        {{else}}
                          {{d-icon "link"}}
                          {{i18n
                            "user.invited.invited_via_link"
                            key=invite.shortKey
                            count=invite.redemption_count
                            max=invite.max_redemptions_allowed
                          }}
                        {{/if}}
  
                        {{#each invite.groups as |g|}}
                          <p class="invite-extra"><a href="/g/{{g.name}}">{{d-icon
                                "users"
                              }}
                              {{g.name}}</a></p>
                        {{/each}}
  
                        {{#if invite.topic}}
                          <p class="invite-extra"><a
                              href={{invite.topic.url}}
                            >{{d-icon "file"}} {{invite.topic.title}}</a></p>
                        {{/if}}
                      </td>
  
                      <td class="invite-updated-at">
                        <div class="label">{{i18n "user.invited.sent"}}</div>
                        {{format-date invite.updated_at}}
                      </td>
  
                      <td class="invite-expires-at">
                        <div class="label">{{i18n
                            "user.invited.expires_at"
                          }}</div>
                        {{#if this.inviteExpired}}
                          {{raw-date invite.expires_at}}
                        {{else if invite.expired}}
                          {{i18n "user.invited.expired"}}
                        {{else}}
                          {{raw-date invite.expires_at}}
                        {{/if}}
                      </td>
  
                      <td class="invite-actions">
                        <DButton
                          @class="btn-default"
                          @icon="pencil-alt"
                          @action={{action "editInvite" invite}}
                          @title="user.invited.edit"
                        />
                        <DButton
                          @icon="trash-alt"
                          @class="cancel"
                          @action={{action "destroyInvite" invite}}
                          @title={{if
                            invite.destroyed
                            "user.invited.removed"
                            "user.invited.remove"
                          }}
                        />
                      </td>
                    </tr>
                  {{/each}}
                </tbody>
              </table>
            {{/if}}
  
            <ConditionalLoadingSpinner @condition={{this.invitesLoading}} />
          {{else}}
            <div class="user-invite-none">
              {{#if this.canBulkInvite}}
                {{html-safe (i18n "user.invited.bulk_invite.none")}}
              {{else}}
                {{i18n "user.invited.none"}}
              {{/if}}
            </div>
          {{/if}}
        </section>
      </LoadMore>
    {{else}}
      <div class="alert alert-error invite-error">
        {{this.model.error}}
      </div>
    {{/if}}
  </DSection>
  */
  {
    "id": "OaKmfo3r",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@tagName\"],[\"user-invites\",\"\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"canInviteToForum\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@class\",\"@id\",\"@selector\",\"@action\"],[\"user-content\",\"user-content\",\".user-invite-list tr\",[28,[37,3],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\"],[\"user-additional-controls\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"showSearch\"]],[[[1,\"          \"],[10,0],[14,0,\"user-invite-search\"],[12],[1,\"\\n            \"],[10,\"form\"],[12],[8,[39,4],null,[[\"@value\",\"@placeholderKey\"],[[30,0,[\"searchTerm\"]],\"user.invited.search\"]],null],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[8,[39,0],null,[[\"@class\"],[\"user-invite-buttons\"]],[[\"default\"],[[[[1,\"\\n          \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\",\"@label\"],[\"btn-default\",\"plus\",[28,[37,3],[[30,0],\"createInvite\"],null],\"user.invited.create\"]],null],[1,\"\\n\"],[41,[30,0,[\"canBulkInvite\"]],[[[41,[30,0,[\"siteSettings\",\"allow_bulk_invite\"]],[[[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"                \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\",\"@label\"],[\"btn-flat\",\"upload\",[28,[37,3],[[30,0],\"createInviteCsv\"],null],\"user.invited.bulk_invite.text\"]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[41,[30,0,[\"showBulkActionButtons\"]],[[[41,[30,0,[\"inviteExpired\"]],[[[41,[30,0,[\"removedAll\"]],[[[1,\"                \"],[10,1],[14,0,\"removed-all\"],[12],[1,\"\\n                  \"],[1,[28,[35,7],[\"user.invited.removed_all\"],null]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[8,[39,5],null,[[\"@icon\",\"@action\",\"@label\"],[\"times\",[28,[37,3],[[30,0],\"destroyAllExpired\"],null],\"user.invited.remove_all\"]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[41,[30,0,[\"invitePending\"]],[[[41,[30,0,[\"reinvitedAll\"]],[[[1,\"                \"],[10,1],[14,0,\"reinvited-all\"],[12],[1,\"\\n                  \"],[8,[39,5],null,[[\"@icon\",\"@disabled\",\"@label\"],[\"check\",true,\"user.invited.reinvited_all\"]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"hasEmailInvites\"]],[[[1,\"                \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\",\"@label\"],[\"btn-default\",\"sync\",[28,[37,3],[[30,0],\"reinviteAll\"],null],\"user.invited.reinvite_all\"]],null],[1,\"\\n              \"]],[]],null]],[]]]],[]],null]],[]],null],[1,\"        \"]],[]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[10,\"section\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"invites\"]],[[[41,[30,0,[\"inviteRedeemed\"]],[[[1,\"            \"],[10,\"table\"],[14,0,\"table user-invite-list\"],[12],[1,\"\\n              \"],[10,\"thead\"],[12],[1,\"\\n                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.user\"],null]],[13],[1,\"\\n                  \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.redeemed_at\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_see_invite_details\"]],[[[1,\"                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.last_seen\"],null]],[13],[1,\"\\n                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.topics_entered\"],null]],[13],[1,\"\\n                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.posts_read_count\"],null]],[13],[1,\"\\n                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.time_read\"],null]],[13],[1,\"\\n                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.days_visited\"],null]],[13],[1,\"\\n                    \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.invited_via\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"model\",\"invites\"]]],null]],null],null,[[[1,\"                  \"],[10,\"tr\"],[12],[1,\"\\n                    \"],[10,\"td\"],[12],[1,\"\\n                      \"],[8,[39,10],null,[[\"@route\",\"@model\"],[\"user\",[30,1,[\"user\"]]]],[[\"default\"],[[[[1,[28,[35,11],[[30,1,[\"user\"]]],[[\"imageSize\"],[\"tiny\"]]]]],[]]]]],[1,\"\\n                      \"],[8,[39,10],null,[[\"@route\",\"@model\"],[\"user\",[30,1,[\"user\"]]]],[[\"default\"],[[[[1,[30,1,[\"user\",\"username\"]]]],[]]]]],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,\"td\"],[12],[1,[28,[35,12],[[30,1,[\"redeemed_at\"]]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"can_see_invite_details\"]],[[[1,\"                      \"],[10,\"td\"],[12],[1,[28,[35,12],[[30,1,[\"user\",\"last_seen_at\"]]],null]],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,[28,[35,13],[[30,1,[\"user\",\"topics_entered\"]]],null]],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,[28,[35,13],[[30,1,[\"user\",\"posts_read_count\"]]],null]],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,[28,[35,14],[[30,1,[\"user\",\"time_read\"]]],null]],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[10,1],[15,\"title\",[28,[37,7],[\"user.invited.days_visited\"],null]],[12],[1,[28,[35,15],[[30,1,[\"user\",\"days_visited\"]]],null]],[13],[1,\"\\n                        /\\n                        \"],[10,1],[15,\"title\",[28,[37,7],[\"user.invited.account_age_days\"],null]],[12],[1,[28,[35,15],[[30,1,[\"user\",\"days_since_created\"]]],null]],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,[28,[35,15],[[30,1,[\"invite_source\"]]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[1]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,\"table\"],[14,0,\"table user-invite-list\"],[12],[1,\"\\n              \"],[10,\"thead\"],[12],[1,\"\\n                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.invited_via\"],null]],[13],[1,\"\\n                  \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.sent\"],null]],[13],[1,\"\\n                  \"],[10,\"th\"],[12],[1,[28,[35,7],[\"user.invited.expires_at\"],null]],[13],[1,\"\\n                  \"],[10,\"th\"],[12],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"model\",\"invites\"]]],null]],null],null,[[[1,\"                  \"],[10,\"tr\"],[12],[1,\"\\n                    \"],[10,\"td\"],[14,0,\"invite-type\"],[12],[1,\"\\n                      \"],[10,0],[14,0,\"label\"],[12],[1,[28,[35,7],[\"user.invited.invited_via\"],null]],[13],[1,\"\\n\"],[41,[30,2,[\"email\"]],[[[1,\"                        \"],[1,[28,[35,16],[\"envelope\"],null]],[1,\"\\n                        \"],[1,[30,2,[\"email\"]]],[1,\"\\n\"]],[]],[[[1,\"                        \"],[1,[28,[35,16],[\"link\"],null]],[1,\"\\n                        \"],[1,[28,[35,7],[\"user.invited.invited_via_link\"],[[\"key\",\"count\",\"max\"],[[30,2,[\"shortKey\"]],[30,2,[\"redemption_count\"]],[30,2,[\"max_redemptions_allowed\"]]]]]],[1,\"\\n\"]],[]]],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,2,[\"groups\"]]],null]],null],null,[[[1,\"                        \"],[10,2],[14,0,\"invite-extra\"],[12],[10,3],[15,6,[29,[\"/g/\",[30,3,[\"name\"]]]]],[12],[1,[28,[35,16],[\"users\"],null]],[1,\"\\n                            \"],[1,[30,3,[\"name\"]]],[13],[13],[1,\"\\n\"]],[3]],null],[1,\"\\n\"],[41,[30,2,[\"topic\"]],[[[1,\"                        \"],[10,2],[14,0,\"invite-extra\"],[12],[10,3],[15,6,[30,2,[\"topic\",\"url\"]]],[12],[1,[28,[35,16],[\"file\"],null]],[1,\" \"],[1,[30,2,[\"topic\",\"title\"]]],[13],[13],[1,\"\\n\"]],[]],null],[1,\"                    \"],[13],[1,\"\\n\\n                    \"],[10,\"td\"],[14,0,\"invite-updated-at\"],[12],[1,\"\\n                      \"],[10,0],[14,0,\"label\"],[12],[1,[28,[35,7],[\"user.invited.sent\"],null]],[13],[1,\"\\n                      \"],[1,[28,[35,12],[[30,2,[\"updated_at\"]]],null]],[1,\"\\n                    \"],[13],[1,\"\\n\\n                    \"],[10,\"td\"],[14,0,\"invite-expires-at\"],[12],[1,\"\\n                      \"],[10,0],[14,0,\"label\"],[12],[1,[28,[35,7],[\"user.invited.expires_at\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"inviteExpired\"]],[[[1,\"                        \"],[1,[28,[35,17],[[30,2,[\"expires_at\"]]],null]],[1,\"\\n\"]],[]],[[[41,[30,2,[\"expired\"]],[[[1,\"                        \"],[1,[28,[35,7],[\"user.invited.expired\"],null]],[1,\"\\n\"]],[]],[[[1,\"                        \"],[1,[28,[35,17],[[30,2,[\"expires_at\"]]],null]],[1,\"\\n                      \"]],[]]]],[]]],[1,\"                    \"],[13],[1,\"\\n\\n                    \"],[10,\"td\"],[14,0,\"invite-actions\"],[12],[1,\"\\n                      \"],[8,[39,5],null,[[\"@class\",\"@icon\",\"@action\",\"@title\"],[\"btn-default\",\"pencil-alt\",[28,[37,3],[[30,0],\"editInvite\",[30,2]],null],\"user.invited.edit\"]],null],[1,\"\\n                      \"],[8,[39,5],null,[[\"@icon\",\"@class\",\"@action\",\"@title\"],[\"trash-alt\",\"cancel\",[28,[37,3],[[30,0],\"destroyInvite\",[30,2]],null],[52,[30,2,[\"destroyed\"]],\"user.invited.removed\",\"user.invited.remove\"]]],null],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[2]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n          \"],[8,[39,18],null,[[\"@condition\"],[[30,0,[\"invitesLoading\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,0],[14,0,\"user-invite-none\"],[12],[1,\"\\n\"],[41,[30,0,[\"canBulkInvite\"]],[[[1,\"              \"],[1,[28,[35,15],[[28,[37,7],[\"user.invited.bulk_invite.none\"],null]],null]],[1,\"\\n\"]],[]],[[[1,\"              \"],[1,[28,[35,7],[\"user.invited.none\"],null]],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-error invite-error\"],[12],[1,\"\\n      \"],[1,[30,0,[\"model\",\"error\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]]]]]],[\"invite\",\"invite\",\"g\"],false,[\"d-section\",\"if\",\"load-more\",\"action\",\"text-field\",\"d-button\",\"unless\",\"i18n\",\"each\",\"-track-array\",\"link-to\",\"avatar\",\"format-date\",\"number\",\"format-duration\",\"html-safe\",\"d-icon\",\"raw-date\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/user-invited-show.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});