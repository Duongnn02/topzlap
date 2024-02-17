define("discourse/widgets/sidebar-toggle", ["exports", "discourse/widgets/widget"], function (_exports, _widget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("sidebar-toggle", {
    tagName: "span.header-sidebar-toggle",
    html() {
      const attrs = this.attrs;
      return [this.attach("button", {
        title: attrs.showSidebar ? "sidebar.hide_sidebar" : "sidebar.show_sidebar",
        icon: "bars",
        action: this.site.narrowDesktopView ? "toggleHamburger" : "toggleSidebar",
        className: `btn btn-flat btn-sidebar-toggle ${this.site.narrowDesktopView ? "narrow-desktop" : ""}`,
        ariaExpanded: attrs.showSidebar ? "true" : "false",
        ariaControls: "d-sidebar"
      })];
    }
  });
  _exports.default = _default;
});