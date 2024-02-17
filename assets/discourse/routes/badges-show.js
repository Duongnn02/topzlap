define("discourse/routes/badges-show", ["exports", "discourse/models/badge", "discourse/routes/discourse", "discourse/lib/preload-store", "discourse/models/user-badge", "discourse/mixins/scroll-top", "rsvp", "@ember/object"], function (_exports, _badge, _discourse, _preloadStore, _userBadge, _scrollTop, _rsvp, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/badge",0,"discourse/routes/discourse",0,"discourse/lib/preload-store",0,"discourse/models/user-badge",0,"discourse/mixins/scroll-top",0,"rsvp",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    queryParams: {
      username: {
        refreshModel: true
      }
    },
    serialize(model) {
      return model.getProperties("id", "slug");
    },
    model(params) {
      if (_preloadStore.default.get("badge")) {
        return _preloadStore.default.getAndRemove("badge").then(json => _badge.default.createFromJson(json));
      } else {
        return _badge.default.findById(params.id);
      }
    },
    afterModel(model, transition) {
      const usernameFromParams = transition.to.queryParams && transition.to.queryParams.username;
      const userBadgesGrant = _userBadge.default.findByBadgeId(model.get("id"), {
        username: usernameFromParams
      }).then(userBadges => {
        this.userBadgesGrant = userBadges;
      });
      const username = this.currentUser && this.currentUser.username_lower;
      const userBadgesAll = _userBadge.default.findByUsername(username).then(userBadges => {
        this.userBadgesAll = userBadges;
      });
      const promises = {
        userBadgesGrant,
        userBadgesAll
      };
      return (0, _rsvp.hash)(promises);
    },
    titleToken() {
      const model = this.modelFor("badges.show");
      if (model) {
        return model.get("name");
      }
    },
    setupController(controller, model) {
      controller.set("model", model);
      controller.set("userBadges", this.userBadgesGrant);
      controller.set("userBadgesAll", this.userBadgesAll);
    },
    didTransition() {
      this.controllerFor("badges/show")._showFooter();
      (0, _scrollTop.scrollTop)();
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});