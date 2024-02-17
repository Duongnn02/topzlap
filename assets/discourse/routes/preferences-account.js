define("discourse/routes/preferences-account", ["exports", "discourse/routes/restricted-user", "discourse/models/user-badge", "discourse/lib/show-modal", "@ember/object", "I18n"], function (_exports, _restrictedUser, _userBadge, _showModal, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user",0,"discourse/models/user-badge",0,"discourse/lib/show-modal",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _restrictedUser.default.extend((_obj = {
    showFooter: true,
    model() {
      const user = this.modelFor("user");
      if (this.siteSettings.enable_badges) {
        return _userBadge.default.findByUsername(user.get("username")).then(userBadges => {
          user.set("badges", userBadges.map(ub => ub.badge));
          return user;
        });
      } else {
        return user;
      }
    },
    setupController(controller, user) {
      controller.reset();
      controller.setProperties({
        model: user,
        newNameInput: user.get("name"),
        newTitleInput: user.get("title"),
        newPrimaryGroupInput: user.get("primary_group_id"),
        newFlairGroupId: user.get("flair_group_id"),
        newStatus: user.status,
        subpageTitle: _I18n.default.t("user.preferences_nav.account")
      });
    },
    showAvatarSelector(user) {
      (0, _showModal.default)("avatar-selector").setProperties({
        user
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "showAvatarSelector", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showAvatarSelector"), _obj)), _obj));
  _exports.default = _default;
});