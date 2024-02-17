define("discourse/helpers/bound-avatar-template", ["exports", "discourse/lib/utilities", "discourse-common/lib/helpers", "@ember/utils"], function (_exports, _utilities, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)((avatarTemplate, size) => {
    if ((0, _utils.isEmpty)(avatarTemplate)) {
      return "<div class='avatar-placeholder'></div>";
    } else {
      return (0, _utilities.avatarImg)({
        size,
        avatarTemplate
      });
    }
  });
  _exports.default = _default;
});