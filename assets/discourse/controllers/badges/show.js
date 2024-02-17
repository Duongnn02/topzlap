define("discourse/controllers/badges/show", ["exports", "@ember/object", "@ember/controller", "discourse-common/utils/decorators", "discourse/models/badge", "I18n", "discourse/models/user-badge"], function (_exports, _object, _controller, _decorators, _badge, _I18n, _userBadge) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/models/badge",0,"I18n",0,"discourse/models/user-badge"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("userBadgesAll"), _dec2 = (0, _decorators.default)("filteredList"), _dec3 = (0, _decorators.default)("username"), _dec4 = (0, _decorators.default)("username", "model.grant_count", "userBadges.grant_count"), _dec5 = (0, _decorators.default)("model.grant_count", "userBadges.grant_count"), _dec6 = (0, _decorators.default)("model.allow_title", "model.has_badge", "model"), _dec7 = (0, _decorators.default)("noMoreBadges", "grantCount", "userBadges.length"), _dec8 = (0, _decorators.default)("user", "model.grant_count"), _dec9 = (0, _decorators.observes)("canLoadMore"), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["username"],
    noMoreBadges: false,
    userBadges: null,
    hiddenSetTitle: true,
    filteredList(userBadgesAll) {
      return userBadgesAll.filterBy("badge.allow_title", true);
    },
    selectableUserBadges(filteredList) {
      return [_object.default.create({
        id: 0,
        badge: _badge.default.create({
          name: _I18n.default.t("badges.none")
        })
      }), ...filteredList.uniqBy("badge.name")];
    },
    user(username) {
      if (username) {
        return this.userBadges[0].get("user");
      }
    },
    grantCount(username, modelCount, userCount) {
      return username ? userCount : modelCount;
    },
    othersCount(modelCount, userCount) {
      return modelCount - userCount;
    },
    canSelectTitle(hasTitleBadges, hasBadge) {
      return this.siteSettings.enable_badges && hasTitleBadges && hasBadge;
    },
    canLoadMore(noMoreBadges, grantCount, userBadgeLength) {
      if (noMoreBadges) {
        return false;
      }
      return grantCount > (userBadgeLength || 0);
    },
    canShowOthers(user, grantCount) {
      return !!user && grantCount > 1;
    },
    _showFooter() {
      this.set("application.showFooter", !this.canLoadMore);
    },
    loadMore() {
      if (!this.canLoadMore) {
        return;
      }
      if (this.loadingMore) {
        return;
      }
      this.set("loadingMore", true);
      const userBadges = this.userBadges;
      _userBadge.default.findByBadgeId(this.get("model.id"), {
        offset: userBadges.length,
        username: this.username
      }).then(result => {
        userBadges.pushObjects(result);
        if (userBadges.length === 0) {
          this.set("noMoreBadges", true);
        }
      }).finally(() => {
        this.set("loadingMore", false);
      });
    },
    toggleSetUserTitle() {
      return this.toggleProperty("hiddenSetTitle");
    }
  }, (_applyDecoratedDescriptor(_obj, "filteredList", [_dec], Object.getOwnPropertyDescriptor(_obj, "filteredList"), _obj), _applyDecoratedDescriptor(_obj, "selectableUserBadges", [_dec2], Object.getOwnPropertyDescriptor(_obj, "selectableUserBadges"), _obj), _applyDecoratedDescriptor(_obj, "user", [_dec3], Object.getOwnPropertyDescriptor(_obj, "user"), _obj), _applyDecoratedDescriptor(_obj, "grantCount", [_dec4], Object.getOwnPropertyDescriptor(_obj, "grantCount"), _obj), _applyDecoratedDescriptor(_obj, "othersCount", [_dec5], Object.getOwnPropertyDescriptor(_obj, "othersCount"), _obj), _applyDecoratedDescriptor(_obj, "canSelectTitle", [_dec6], Object.getOwnPropertyDescriptor(_obj, "canSelectTitle"), _obj), _applyDecoratedDescriptor(_obj, "canLoadMore", [_dec7], Object.getOwnPropertyDescriptor(_obj, "canLoadMore"), _obj), _applyDecoratedDescriptor(_obj, "canShowOthers", [_dec8], Object.getOwnPropertyDescriptor(_obj, "canShowOthers"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec9], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "toggleSetUserTitle", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleSetUserTitle"), _obj)), _obj)));
  _exports.default = _default;
});