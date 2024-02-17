define("discourse/routes/user", ["exports", "discourse/routes/discourse", "discourse/models/user", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _discourse, _user, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/user",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    beforeModel() {
      if (this.siteSettings.hide_user_profiles_from_public && !this.currentUser) {
        this.replaceWith("discovery");
      }
    },
    model(params) {
      // If we're viewing the currently logged in user, return that object instead
      if (this.currentUser && params.username.toLowerCase() === this.currentUser.username_lower) {
        return this.currentUser;
      }
      return _user.default.create({
        username: encodeURIComponent(params.username)
      });
    },
    afterModel() {
      const user = this.modelFor("user");
      return user.findDetails().then(() => user.findStaffInfo()).then(() => user.trackStatus()).catch(() => this.replaceWith("/404"));
    },
    serialize(model) {
      if (!model) {
        return {};
      }
      return {
        username: (model.username || "").toLowerCase()
      };
    },
    setupController(controller, user) {
      controller.set("model", user);
      this.searchService.set("searchContext", user.searchContext);
    },
    activate() {
      this._super(...arguments);
      const user = this.modelFor("user");
      this.messageBus.subscribe(`/u/${user.username_lower}`, this.onUserMessage);
      this.messageBus.subscribe(`/u/${user.username_lower}/counters`, this.onUserCountersMessage);
    },
    deactivate() {
      this._super(...arguments);
      const user = this.modelFor("user");
      this.messageBus.unsubscribe(`/u/${user.username_lower}`, this.onUserMessage);
      this.messageBus.unsubscribe(`/u/${user.username_lower}/counters`, this.onUserCountersMessage);
      user.stopTrackingStatus();

      // Remove the search context
      this.searchService.set("searchContext", null);
    },
    onUserMessage(data) {
      const user = this.modelFor("user");
      return user.loadUserAction(data);
    },
    onUserCountersMessage(data) {
      const user = this.modelFor("user");
      user.setProperties(data);
      Object.entries(data).forEach(_ref => {
        let [key, value] = _ref;
        return this.appEvents.trigger(`count-updated:${user.username_lower}:${key}`, value);
      });
    },
    titleToken() {
      const username = this.modelFor("user").username;
      return username ? username : null;
    },
    undoRevokeApiKey(key) {
      key.undoRevoke();
    },
    revokeApiKey(key) {
      key.revoke();
    }
  }, (_applyDecoratedDescriptor(_obj, "onUserMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onUserMessage"), _obj), _applyDecoratedDescriptor(_obj, "onUserCountersMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onUserCountersMessage"), _obj), _applyDecoratedDescriptor(_obj, "undoRevokeApiKey", [_object.action], Object.getOwnPropertyDescriptor(_obj, "undoRevokeApiKey"), _obj), _applyDecoratedDescriptor(_obj, "revokeApiKey", [_object.action], Object.getOwnPropertyDescriptor(_obj, "revokeApiKey"), _obj)), _obj));
  _exports.default = _default;
});