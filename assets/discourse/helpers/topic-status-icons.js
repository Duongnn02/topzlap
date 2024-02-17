define("discourse/helpers/topic-status-icons", ["exports", "@ember/array/proxy"], function (_exports, _proxy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/array/proxy"eaimeta@70e063a35619d71f
  var _default = _proxy.default.extend({
    render(topic, renderIcon) {
      const renderIconIf = (conditionProp, name, key) => {
        if (!topic.get(conditionProp)) {
          return;
        }
        renderIcon(name, key);
      };
      if (topic.get("closed") && topic.get("archived")) {
        renderIcon("lock", "locked_and_archived");
      } else {
        renderIconIf("closed", "lock", "locked");
        renderIconIf("archived", "lock", "archived");
      }
      this.forEach(args => renderIconIf(...args));
    }
  }).create({
    content: [["is_warning", "envelope", "warning"], ["pinned", "thumbtack", "pinned"], ["unpinned", "thumbtack", "unpinned"], ["invisible", "far-eye-slash", "unlisted"]]
  });
  _exports.default = _default;
});