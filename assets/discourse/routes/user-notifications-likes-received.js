define("discourse/routes/user-notifications-likes-received", ["exports", "discourse/models/user-action", "discourse/routes/user-activity-stream", "I18n"], function (_exports, _userAction, _userActivityStream, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/user-action",0,"discourse/routes/user-activity-stream",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _userActivityStream.default.extend({
    userActionType: _userAction.default.TYPES["likes_received"],
    titleToken() {
      return _I18n.default.t("user_action_groups.1");
    }
  });
  _exports.default = _default;
});