define("discourse/widgets/topic-post-visited-line", ["exports", "I18n", "discourse/widgets/widget", "virtual-dom"], function (_exports, _I18n, _widget, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("topic-post-visited-line", {
    tagName: "div.small-action.topic-post-visited",
    html(attrs) {
      return (0, _virtualDom.h)(`div.topic-post-visited-line.post-${attrs.post_number}}`, (0, _virtualDom.h)("span.topic-post-visited-message", _I18n.default.t("topics.new_messages_marker")));
    }
  });
  _exports.default = _default;
});