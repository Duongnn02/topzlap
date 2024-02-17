define("discourse/helpers/bound-avatar", ["exports", "discourse/helpers/user-avatar", "discourse/lib/utilities", "@ember/object", "discourse-common/lib/helpers", "@ember/utils"], function (_exports, _userAvatar, _utilities, _object, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/helpers/user-avatar",0,"discourse/lib/utilities",0,"@ember/object",0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)((user, size) => {
    if ((0, _utils.isEmpty)(user)) {
      return "<div class='avatar-placeholder'></div>";
    }
    const avatarTemplate = (0, _object.get)(user, "avatar_template");
    return (0, _utilities.avatarImg)((0, _userAvatar.addExtraUserClasses)(user, {
      size,
      avatarTemplate
    }));
  });
  _exports.default = _default;
});