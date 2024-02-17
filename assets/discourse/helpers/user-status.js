define("discourse/helpers/user-status", ["exports", "I18n", "discourse/lib/utilities", "discourse-common/lib/helpers", "discourse-common/lib/icon-library"], function (_exports, _I18n, _utilities, _helpers, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/utilities",0,"discourse-common/lib/helpers",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)((user, args) => {
    if (!user) {
      return;
    }
    const name = (0, _utilities.escapeExpression)(user.get("name"));
    let currentUser;
    if (args && args.hash) {
      currentUser = args.hash.currentUser;
    }
    if (currentUser && user.get("admin") && currentUser.get("staff")) {
      return (0, _iconLibrary.iconHTML)("shield-alt", {
        label: _I18n.default.t("user.admin", {
          user: name
        })
      });
    }
    if (user.get("moderator")) {
      return (0, _iconLibrary.iconHTML)("shield-alt", {
        label: _I18n.default.t("user.moderator", {
          user: name
        })
      });
    }
  });
  _exports.default = _default;
});