define("discourse/widgets/header-contents", ["discourse/widgets/widget"], function (_widget) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/widgets/hbs-compiler"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("header-contents", {
    tagName: "div.contents.clearfix",
    transform() {
      return {
        showBootstrapMode: this.currentUser?.staff && this.site.desktopView
      };
    },
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n");
      if (this.site.desktopView) {
        if (attrs.sidebarEnabled) {
          _r.push("        ");
          _r.push(this.attach("sidebar-toggle", attrs));
          _r.push("\n");
        }
      }
      _r.push("\n    ");
      _r.push(this.attach("home-logo", attrs));
      _r.push("\n\n");
      if (attrs.topic) {
        _r.push("      ");
        _r.push(this.attach("header-topic-info", attrs));
        _r.push("\n");
      } else {
        if (this.siteSettings.bootstrap_mode_enabled) {
          if (this.transformed.showBootstrapMode) {
            _r.push("        ");
            _r.push(this.attach("header-bootstrap-mode", attrs));
            _r.push("\n");
          }
          _r.push("    ");
        }
      }
      _r.push("\n    ");
      var _a0 = [];
      _a0.push(this.attrs.contents());
      _r.push(virtualDom.h('div', {
        "className": "panel clearfix",
        "attributes": {
          "role": "navigation"
        }
      }, _a0));
      _r.push("\n  ");
      return _r;
    }
  });
});