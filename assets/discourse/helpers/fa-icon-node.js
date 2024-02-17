define("discourse/helpers/fa-icon-node", ["exports", "discourse-common/lib/icon-library"], function (_exports, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.iconNode = iconNode;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  function iconNode(id, params) {
    return (0, _iconLibrary.renderIcon)("node", id, params);
  }
});