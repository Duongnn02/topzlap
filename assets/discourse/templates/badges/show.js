define("discourse/templates/badges/show", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container show-badge {{this.model.slug}}">
    <h1>
      <LinkTo @route="badges.index">{{i18n "badges.title"}}</LinkTo>
      /
      {{this.model.name}}
    </h1>
  
    <div class="show-badge-details">
      <BadgeCard
        @badge={{this.model}}
        @size="large"
        @count={{this.userBadges.grant_count}}
      />
      <div class="badge-grant-info {{if this.hiddenSetTitle '' 'hidden'}}">
        <div>
          {{#if this.canSelectTitle}}
            <div class="grant-info-item">
              {{i18n "badges.allow_title"}}
              <DButton
                @class="btn-default pad-left"
                @action={{action "toggleSetUserTitle"}}
                @icon="pencil-alt"
              />
            </div>
          {{/if}}
          {{#if this.model.multiple_grant}}
            <div class="grant-info-item">
              {{i18n "badges.multiple_grant"}}
            </div>
          {{/if}}
        </div>
      </div>
  
      {{#if this.canSelectTitle}}
        <div class="badge-set-title {{if this.hiddenSetTitle 'hidden' ''}}">
          <BadgeTitle @selectableUserBadges={{this.selectableUserBadges}} />
          <DButton
            @class="btn-default close-btn"
            @action={{action "toggleSetUserTitle"}}
            @label="close"
          />
        </div>
      {{/if}}
    </div>
  
    {{#if this.userBadges}}
      <div class="user-badges {{this.model.slug}}">
        <LoadMore @selector=".badge-info" @action={{action "loadMore"}}>
          <div class="badges-granted">
            {{#each this.userBadges as |ub|}}
              <UserInfo
                @user={{ub.user}}
                @size="medium"
                @class="badge-info"
                @date={{ub.granted_at}}
              >
                <div class="granted-on">{{i18n
                    "badges.granted_on"
                    date=(inline-date ub.granted_at)
                  }}</div>
                {{#if ub.post_number}}
                  <a
                    class="post-link"
                    href="{{ub.topic.url}}/{{ub.post_number}}"
                  >{{html-safe ub.topic.fancyTitle}}</a>
                {{/if}}
              </UserInfo>
            {{/each}}
          </div>
        </LoadMore>
  
        {{#unless this.canLoadMore}}
          {{#if this.canShowOthers}}
            <div>
              <a
                id="show-others-with-badge-link"
                href={{this.model.url}}
                class="btn btn-default"
              >{{i18n "badges.others_count" count=this.othersCount}}</a>
            </div>
          {{/if}}
        {{/unless}}
      </div>
  
      <ConditionalLoadingSpinner @condition={{this.canLoadMore}} />
    {{/if}}
  </div>
  */
  {
    "id": "c/75APXe",
    "block": "[[[10,0],[15,0,[29,[\"container show-badge \",[30,0,[\"model\",\"slug\"]]]]],[12],[1,\"\\n  \"],[10,\"h1\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@route\"],[\"badges.index\"]],[[\"default\"],[[[[1,[28,[35,1],[\"badges.title\"],null]]],[]]]]],[1,\"\\n    /\\n    \"],[1,[30,0,[\"model\",\"name\"]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"show-badge-details\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@badge\",\"@size\",\"@count\"],[[30,0,[\"model\"]],\"large\",[30,0,[\"userBadges\",\"grant_count\"]]]],null],[1,\"\\n    \"],[10,0],[15,0,[29,[\"badge-grant-info \",[52,[30,0,[\"hiddenSetTitle\"]],\"\",\"hidden\"]]]],[12],[1,\"\\n      \"],[10,0],[12],[1,\"\\n\"],[41,[30,0,[\"canSelectTitle\"]],[[[1,\"          \"],[10,0],[14,0,\"grant-info-item\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"badges.allow_title\"],null]],[1,\"\\n            \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@icon\"],[\"btn-default pad-left\",[28,[37,5],[[30,0],\"toggleSetUserTitle\"],null],\"pencil-alt\"]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"multiple_grant\"]],[[[1,\"          \"],[10,0],[14,0,\"grant-info-item\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"badges.multiple_grant\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSelectTitle\"]],[[[1,\"      \"],[10,0],[15,0,[29,[\"badge-set-title \",[52,[30,0,[\"hiddenSetTitle\"]],\"hidden\",\"\"]]]],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@selectableUserBadges\"],[[30,0,[\"selectableUserBadges\"]]]],null],[1,\"\\n        \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-default close-btn\",[28,[37,5],[[30,0],\"toggleSetUserTitle\"],null],\"close\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"userBadges\"]],[[[1,\"    \"],[10,0],[15,0,[29,[\"user-badges \",[30,0,[\"model\",\"slug\"]]]]],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@selector\",\"@action\"],[\".badge-info\",[28,[37,5],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"badges-granted\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"userBadges\"]]],null]],null],null,[[[1,\"            \"],[8,[39,10],null,[[\"@user\",\"@size\",\"@class\",\"@date\"],[[30,1,[\"user\"]],\"medium\",\"badge-info\",[30,1,[\"granted_at\"]]]],[[\"default\"],[[[[1,\"\\n              \"],[10,0],[14,0,\"granted-on\"],[12],[1,[28,[35,1],[\"badges.granted_on\"],[[\"date\"],[[28,[37,11],[[30,1,[\"granted_at\"]]],null]]]]],[13],[1,\"\\n\"],[41,[30,1,[\"post_number\"]],[[[1,\"                \"],[10,3],[14,0,\"post-link\"],[15,6,[29,[[30,1,[\"topic\",\"url\"]],\"/\",[30,1,[\"post_number\"]]]]],[12],[1,[28,[35,12],[[30,1,[\"topic\",\"fancyTitle\"]]],null]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"]],[]]]]],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n\\n\"],[41,[51,[30,0,[\"canLoadMore\"]]],[[[41,[30,0,[\"canShowOthers\"]],[[[1,\"          \"],[10,0],[12],[1,\"\\n            \"],[10,3],[14,1,\"show-others-with-badge-link\"],[15,6,[30,0,[\"model\",\"url\"]]],[14,0,\"btn btn-default\"],[12],[1,[28,[35,1],[\"badges.others_count\"],[[\"count\"],[[30,0,[\"othersCount\"]]]]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[8,[39,14],null,[[\"@condition\"],[[30,0,[\"canLoadMore\"]]]],null],[1,\"\\n\"]],[]],null],[13]],[\"ub\"],false,[\"link-to\",\"i18n\",\"badge-card\",\"if\",\"d-button\",\"action\",\"badge-title\",\"load-more\",\"each\",\"-track-array\",\"user-info\",\"inline-date\",\"html-safe\",\"unless\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/badges/show.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});