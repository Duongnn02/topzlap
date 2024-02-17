define("discourse/widgets/topic-status", ["exports", "I18n", "discourse/helpers/topic-status-icons", "discourse/widgets/widget", "discourse/lib/utilities", "virtual-dom", "discourse-common/lib/icon-library"], function (_exports, _I18n, _topicStatusIcons, _widget, _utilities, _virtualDom, _iconLibrary) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/helpers/topic-status-icons",0,"discourse/widgets/widget",0,"discourse/lib/utilities",0,"virtual-dom",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("topic-status", {
    tagName: "span.topic-statuses",
    html(attrs) {
      const topic = attrs.topic;
      const canAct = this.currentUser && !attrs.disableActions;
      const result = [];
      _topicStatusIcons.default.render(topic, function (name, key) {
        const iconArgs = {
          class: key === "unpinned" ? "unpinned" : null
        };
        const icon = (0, _iconLibrary.iconNode)(name, iconArgs);
        const attributes = {
          title: (0, _utilities.escapeExpression)(_I18n.default.t(`topic_statuses.${key}.help`))
        };
        let klass = "topic-status";
        if (key === "unpinned" || key === "pinned") {
          klass += `.pin-toggle-button.${key}`;
        }
        result.push((0, _virtualDom.h)(`${canAct ? "a" : "span"}.${klass}`, attributes, icon));
      });
      return result;
    },
    click(e) {
      const parent = e.target.closest(".topic-statuses");
      if (parent?.querySelector(".pin-toggle-button")?.contains(e.target)) {
        this.attrs.topic.togglePinnedForUser();
      }
    }
  });
  _exports.default = _default;
});