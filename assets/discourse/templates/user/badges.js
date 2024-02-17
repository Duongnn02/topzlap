define("discourse/templates/user/badges", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-badges" @class="user-content" id="user-content">
    <p class="favorite-count">
      {{i18n
        "badges.favorite_count"
        count=this.favoriteBadges.length
        max=this.siteSettings.max_favorite_badges
      }}
    </p>
  
    <div class="badge-group-list">
      {{#each this.sortedBadges as |ub|}}
        <BadgeCard
          @badge={{ub.badge}}
          @count={{ub.count}}
          @canFavorite={{ub.can_favorite}}
          @isFavorite={{ub.is_favorite}}
          @username={{this.username}}
          @canFavoriteMoreBadges={{this.canFavoriteMoreBadges}}
          @onFavoriteClick={{action "favorite" ub}}
          @filterUser="true"
        />
      {{/each}}
      <PluginOutlet
        @name="after-user-profile-badges"
        @outletArgs={{hash user=this.user.model}}
      />
    </div>
  </DSection>
  */
  {
    "id": "aOIrPbPh",
    "block": "[[[8,[39,0],[[24,1,\"user-content\"]],[[\"@pageClass\",\"@class\"],[\"user-badges\",\"user-content\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,2],[14,0,\"favorite-count\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"badges.favorite_count\"],[[\"count\",\"max\"],[[30,0,[\"favoriteBadges\",\"length\"]],[30,0,[\"siteSettings\",\"max_favorite_badges\"]]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"badge-group-list\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"sortedBadges\"]]],null]],null],null,[[[1,\"      \"],[8,[39,4],null,[[\"@badge\",\"@count\",\"@canFavorite\",\"@isFavorite\",\"@username\",\"@canFavoriteMoreBadges\",\"@onFavoriteClick\",\"@filterUser\"],[[30,1,[\"badge\"]],[30,1,[\"count\"]],[30,1,[\"can_favorite\"]],[30,1,[\"is_favorite\"]],[30,0,[\"username\"]],[30,0,[\"canFavoriteMoreBadges\"]],[28,[37,5],[[30,0],\"favorite\",[30,1]],null],\"true\"]],null],[1,\"\\n\"]],[1]],null],[1,\"    \"],[8,[39,6],null,[[\"@name\",\"@outletArgs\"],[\"after-user-profile-badges\",[28,[37,7],null,[[\"user\"],[[30,0,[\"user\",\"model\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"ub\"],false,[\"d-section\",\"i18n\",\"each\",\"-track-array\",\"badge-card\",\"action\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/templates/user/badges.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});