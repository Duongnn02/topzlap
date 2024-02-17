define("discourse/components/load-more", ["exports", "@ember/component", "discourse/mixins/load-more"], function (_exports, _component, _loadMore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/mixins/load-more"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_loadMore.default, {
    init() {
      this._super(...arguments);
      this.set("eyelineSelector", this.selector);
    },
    actions: {
      loadMore() {
        this.action();
      }
    }
  });
  _exports.default = _default;
});