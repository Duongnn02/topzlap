define("discourse/helpers/icon-or-image", ["exports", "discourse-common/lib/icon-library", "discourse-common/lib/helpers", "@ember/utils"], function (_exports, _iconLibrary, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  var _default = (0, _helpers.htmlHelper)(function (_ref) {
    let {
      icon,
      image
    } = _ref;
    if (!(0, _utils.isEmpty)(image)) {
      return `<img src='${image}'>`;
    }
    if ((0, _utils.isEmpty)(icon)) {
      return "";
    }
    icon = (0, _iconLibrary.convertIconClass)(icon);
    return (0, _iconLibrary.iconHTML)(icon);
  });
  _exports.default = _default;
});