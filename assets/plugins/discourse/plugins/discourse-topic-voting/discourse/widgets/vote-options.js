define("discourse/plugins/discourse-topic-voting/discourse/widgets/vote-options", ["exports", "I18n", "discourse/widgets/widget", "virtual-dom"], function (_exports, _I18n, _widget, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("vote-options", {
    tagName: "div.vote-options",
    buildClasses() {
      return "voting-popup-menu popup-menu hidden";
    },
    html(attrs) {
      let contents = [];
      if (attrs.user_voted) {
        contents.push(this.attach("remove-vote", attrs));
      } else if (this.currentUser && this.currentUser.votes_exceeded && !attrs.user_voted) {
        contents.push([(0, _virtualDom.h)("div", _I18n.default.t("topic_voting.reached_limit")), (0, _virtualDom.h)("p", (0, _virtualDom.h)("a", {
          href: this.currentUser.get("path") + "/activity/votes"
        }, _I18n.default.t("topic_voting.list_votes")))]);
      }
      return contents;
    }
  });
  _exports.default = _default;
});