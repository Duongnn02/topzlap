define("discourse/controllers/user-badges", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse-common/utils/decorators"], function (_exports, _controller, _object, _computed, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("favoriteBadges.length"), (_obj = {
    user: (0, _controller.inject)(),
    username: (0, _computed.alias)("user.model.username_lower"),
    sortedBadges: (0, _computed.sort)("model", "badgeSortOrder"),
    favoriteBadges: (0, _computed.filterBy)("model", "is_favorite", true),
    canFavoriteMoreBadges(favoriteBadgesCount) {
      return favoriteBadgesCount < this.siteSettings.max_favorite_badges;
    },
    init() {
      this._super(...arguments);
      this.badgeSortOrder = ["badge.badge_type.sort_order:desc", "badge.name"];
    },
    favorite(badge) {
      return badge.favorite();
    }
  }, (_applyDecoratedDescriptor(_obj, "canFavoriteMoreBadges", [_dec], Object.getOwnPropertyDescriptor(_obj, "canFavoriteMoreBadges"), _obj), _applyDecoratedDescriptor(_obj, "favorite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "favorite"), _obj)), _obj)));
  _exports.default = _default;
});