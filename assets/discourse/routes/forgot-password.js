define("discourse/routes/forgot-password", ["exports", "discourse/routes/build-static-route", "discourse/lib/utilities", "@ember/runloop"], function (_exports, _buildStaticRoute, _utilities, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-static-route",0,"discourse/lib/utilities",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const ForgotPasswordRoute = (0, _buildStaticRoute.default)("password-reset");
  ForgotPasswordRoute.reopen({
    beforeModel() {
      const loginRequired = this.controllerFor("application").get("loginRequired");
      this.replaceWith(loginRequired ? "login" : `discovery.${(0, _utilities.defaultHomepage)()}`).then(e => {
        (0, _runloop.next)(() => e.send("showForgotPassword"));
      });
    }
  });
  var _default = ForgotPasswordRoute;
  _exports.default = _default;
});