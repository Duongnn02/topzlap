define("discourse/routes/login", ["exports", "discourse/routes/build-static-route", "discourse/lib/utilities", "@ember/runloop"], function (_exports, _buildStaticRoute, _utilities, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-static-route",0,"discourse/lib/utilities",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const LoginRoute = (0, _buildStaticRoute.default)("login");
  LoginRoute.reopen({
    beforeModel() {
      if (!this.siteSettings.login_required) {
        this.replaceWith(`/${(0, _utilities.defaultHomepage)()}`).then(e => {
          (0, _runloop.next)(() => e.send("showLogin"));
        });
      }
    }
  });
  var _default = LoginRoute;
  _exports.default = _default;
});