define("discourse-widget-hbs/helpers", ["exports", "discourse/widgets/post", "discourse/helpers/node", "discourse-common/lib/icon-library", "discourse/widgets/raw-html"], function (_exports, _post, _node, _iconLibrary, _rawHtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/post",0,"discourse/helpers/node",0,"discourse-common/lib/icon-library",0,"discourse/widgets/raw-html"eaimeta@70e063a35619d71f
  var _default = {
    avatar: _post.avatarFor,
    dateNode: _node.dateNode,
    iconNode: _iconLibrary.iconNode,
    rawHtml: _rawHtml.default
  };
  _exports.default = _default;
});