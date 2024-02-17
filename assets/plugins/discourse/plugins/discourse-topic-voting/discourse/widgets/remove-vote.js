define("discourse/plugins/discourse-topic-voting/discourse/widgets/remove-vote", ["exports", "I18n", "discourse/widgets/widget", "discourse-common/lib/icon-library"], function (_exports, _I18n, _widget, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("remove-vote", {
    tagName: "div.remove-vote",
    buildClasses() {
      return "vote-option";
    },
    html() {
      return [(0, _iconLibrary.iconNode)("times"), _I18n.default.t("topic_voting.remove_vote")];
    },
    click() {
      this.sendWidgetAction("removeVote");
    }
  });
  _exports.default = _default;
});