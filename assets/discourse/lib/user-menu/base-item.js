define("discourse/lib/user-menu/base-item", ["exports", "discourse/lib/url", "discourse/lib/intercept-click"], function (_exports, _url, _interceptClick) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/lib/intercept-click"eaimeta@70e063a35619d71f
  class UserMenuBaseItem {
    get className() {}
    get linkHref() {
      throw new Error("not implemented");
    }
    get linkTitle() {
      throw new Error("not implemented");
    }
    get icon() {
      throw new Error("not implemented");
    }
    get label() {
      throw new Error("not implemented");
    }
    get labelClass() {}
    get description() {
      throw new Error("not implemented");
    }
    get descriptionClass() {}
    get topicId() {}
    onClick(_ref) {
      let {
        event,
        closeUserMenu
      } = _ref;
      if ((0, _interceptClick.wantsNewWindow)(event)) {
        return;
      }
      closeUserMenu();
      const href = this.linkHref;
      if (href) {
        _url.default.routeTo(href);
      }
      event.preventDefault();
    }
  }
  _exports.default = UserMenuBaseItem;
});