define("discourse/mixins/grant-badge-controller", ["exports", "@ember/object/mixin", "discourse/models/user-badge", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _mixin, _userBadge, _iconLibrary, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse/models/user-badge",0,"discourse-common/lib/icon-library",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create((_dec = (0, _decorators.default)("allBadges.[]", "userBadges.[]"), _dec2 = (0, _decorators.default)("selectedBadgeId", "grantableBadges"), (_obj = {
    grantableBadges(allBadges, userBadges) {
      const granted = userBadges.reduce((map, badge) => {
        map[badge.get("badge_id")] = true;
        return map;
      }, {});
      return allBadges.filter(badge => {
        return badge.get("enabled") && badge.get("manually_grantable") && (!granted[badge.get("id")] || badge.get("multiple_grant"));
      }).map(badge => {
        if (badge.get("icon")) {
          badge.set("icon", (0, _iconLibrary.convertIconClass)(badge.icon));
        }
        return badge;
      }).sort((a, b) => a.get("name").localeCompare(b.get("name")));
    },
    noGrantableBadges: (0, _computed.empty)("grantableBadges"),
    selectedBadgeGrantable(selectedBadgeId, grantableBadges) {
      return grantableBadges && grantableBadges.find(badge => badge.get("id") === selectedBadgeId);
    },
    grantBadge(selectedBadgeId, username, badgeReason) {
      return _userBadge.default.grant(selectedBadgeId, username, badgeReason).then(newBadge => {
        this.userBadges.pushObject(newBadge);
        return newBadge;
      }, error => {
        throw error;
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "grantableBadges", [_dec], Object.getOwnPropertyDescriptor(_obj, "grantableBadges"), _obj), _applyDecoratedDescriptor(_obj, "selectedBadgeGrantable", [_dec2], Object.getOwnPropertyDescriptor(_obj, "selectedBadgeGrantable"), _obj)), _obj)));
  _exports.default = _default;
});