define("discourse/mixins/can-check-emails", ["exports", "@ember/object/computed", "discourse/lib/computed", "@ember/object/mixin"], function (_exports, _computed, _computed2, _mixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"discourse/lib/computed",0,"@ember/object/mixin"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    isCurrentUser: (0, _computed2.propertyEqual)("model.id", "currentUser.id"),
    showEmailOnProfile: (0, _computed2.setting)("moderators_view_emails"),
    canStaffCheckEmails: (0, _computed.and)("showEmailOnProfile", "currentUser.staff"),
    canAdminCheckEmails: (0, _computed.alias)("currentUser.admin"),
    canCheckEmails: (0, _computed.or)("isCurrentUser", "canStaffCheckEmails", "canAdminCheckEmails")
  });
  _exports.default = _default;
});