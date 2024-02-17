define("discourse/components/discovery-categories", ["exports", "@ember/component", "discourse/mixins/url-refresh"], function (_exports, _component, _urlRefresh) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/mixins/url-refresh"eaimeta@70e063a35619d71f
  const CATEGORIES_LIST_BODY_CLASS = "categories-list";
  var _default = _component.default.extend(_urlRefresh.default, {
    classNames: ["contents"],
    didInsertElement() {
      this._super(...arguments);
      document.body.classList.add(CATEGORIES_LIST_BODY_CLASS);
    },
    willDestroyElement() {
      this._super(...arguments);
      document.body.classList.remove(CATEGORIES_LIST_BODY_CLASS);
    }
  });
  _exports.default = _default;
});