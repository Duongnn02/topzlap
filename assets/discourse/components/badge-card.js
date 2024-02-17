define("discourse/components/badge-card", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/text", "discourse-common/utils/decorators", "@ember/utils"], function (_exports, _component, _templateFactory, _text, _decorators, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/text",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.badge.has_badge}}
    <a href={{this.url}} class="check-display status-checked">{{d-icon
        "check"
      }}</a>
  {{/if}}
  
  {{#if this.canFavorite}}
    {{#if this.isFavorite}}
      <DButton
        @icon="star"
        @class="favorite-btn"
        @action={{this.onFavoriteClick}}
      />
    {{else}}
      <DButton
        @icon="far-star"
        @class="favorite-btn"
        @action={{this.onFavoriteClick}}
        @title={{if
          this.canFavoriteMoreBadges
          "badges.favorite_max_not_reached"
          "badges.favorite_max_reached"
        }}
        @disabled={{not this.canFavoriteMoreBadges}}
      />
    {{/if}}
  {{/if}}
  
  <div class="badge-contents">
    <PluginOutlet
      @name="badge-contents-top"
      @outletArgs={{hash badge=this.badge url=this.url}}
    />
    <a
      href={{this.url}}
      class="badge-icon {{this.badge.badgeTypeClassName}}"
    >{{icon-or-image this.badge}}</a>
    <div class="badge-info">
      <div class="badge-info-item">
        <h3><a href={{this.url}} class="badge-link">{{this.badge.name}}</a></h3>
        <div class="badge-summary">{{html-safe this.summary}}</div>
  
        {{#if this.displayCount}}
  
          <LinkTo
            @route="badges.show"
            @model={{this.badge}}
            class="badge-granted"
          >
            {{number this.displayCount}}
            {{i18n "badges.awarded"}}
          </LinkTo>
  
        {{/if}}
      </div>
    </div>
  </div>
  */
  {
    "id": "tIdHV/TQ",
    "block": "[[[41,[30,0,[\"badge\",\"has_badge\"]],[[[1,\"  \"],[10,3],[15,6,[30,0,[\"url\"]]],[14,0,\"check-display status-checked\"],[12],[1,[28,[35,1],[\"check\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canFavorite\"]],[[[41,[30,0,[\"isFavorite\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@icon\",\"@class\",\"@action\"],[\"star\",\"favorite-btn\",[30,0,[\"onFavoriteClick\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,2],null,[[\"@icon\",\"@class\",\"@action\",\"@title\",\"@disabled\"],[\"far-star\",\"favorite-btn\",[30,0,[\"onFavoriteClick\"]],[52,[30,0,[\"canFavoriteMoreBadges\"]],\"badges.favorite_max_not_reached\",\"badges.favorite_max_reached\"],[28,[37,3],[[30,0,[\"canFavoriteMoreBadges\"]]],null]]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"badge-contents\"],[12],[1,\"\\n  \"],[8,[39,4],null,[[\"@name\",\"@outletArgs\"],[\"badge-contents-top\",[28,[37,5],null,[[\"badge\",\"url\"],[[30,0,[\"badge\"]],[30,0,[\"url\"]]]]]]],null],[1,\"\\n  \"],[10,3],[15,6,[30,0,[\"url\"]]],[15,0,[29,[\"badge-icon \",[30,0,[\"badge\",\"badgeTypeClassName\"]]]]],[12],[1,[28,[35,6],[[30,0,[\"badge\"]]],null]],[13],[1,\"\\n  \"],[10,0],[14,0,\"badge-info\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"badge-info-item\"],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[10,3],[15,6,[30,0,[\"url\"]]],[14,0,\"badge-link\"],[12],[1,[30,0,[\"badge\",\"name\"]]],[13],[13],[1,\"\\n      \"],[10,0],[14,0,\"badge-summary\"],[12],[1,[28,[35,7],[[30,0,[\"summary\"]]],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"displayCount\"]],[[[1,\"\\n        \"],[8,[39,8],[[24,0,\"badge-granted\"]],[[\"@route\",\"@model\"],[\"badges.show\",[30,0,[\"badge\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,9],[[30,0,[\"displayCount\"]]],null]],[1,\"\\n          \"],[1,[28,[35,10],[\"badges.awarded\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"if\",\"d-icon\",\"d-button\",\"not\",\"plugin-outlet\",\"hash\",\"icon-or-image\",\"html-safe\",\"link-to\",\"number\",\"i18n\"]]",
    "moduleName": "discourse/components/badge-card.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("badge.url", "filterUser", "username"), _dec2 = (0, _decorators.default)("count", "badge.grant_count"), _dec3 = (0, _decorators.default)("size", "badge.long_description", "badge.description"), _dec4 = (0, _decorators.default)("badge.id"), (_obj = {
    size: "medium",
    classNameBindings: [":badge-card", "size", "badge.slug"],
    url(badgeUrl, filterUser, username) {
      return filterUser ? `${badgeUrl}?username=${username}` : badgeUrl;
    },
    displayCount(count, grantCount) {
      if (count == null) {
        return grantCount;
      }
      if (count > 1) {
        return count;
      }
    },
    summary(size, longDescription, description) {
      if (size === "large") {
        if (!(0, _utils.isEmpty)(longDescription)) {
          return (0, _text.emojiUnescape)((0, _text.sanitize)(longDescription));
        }
      }
      return (0, _text.sanitize)(description);
    },
    showFavorite(badgeId) {
      return ![1, 2, 3, 4].includes(badgeId);
    }
  }, (_applyDecoratedDescriptor(_obj, "url", [_dec], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "displayCount", [_dec2], Object.getOwnPropertyDescriptor(_obj, "displayCount"), _obj), _applyDecoratedDescriptor(_obj, "summary", [_dec3], Object.getOwnPropertyDescriptor(_obj, "summary"), _obj), _applyDecoratedDescriptor(_obj, "showFavorite", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showFavorite"), _obj)), _obj))));
  _exports.default = _default;
});