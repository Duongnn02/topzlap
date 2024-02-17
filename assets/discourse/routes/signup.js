define("discourse/routes/signup", ["exports", "discourse/routes/build-static-route", "@ember/runloop"], function (_exports, _buildStaticRoute, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-static-route",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const SignupRoute = (0, _buildStaticRoute.default)("signup");
  SignupRoute.reopen({
    beforeModel() {
      let canSignUp = this.controllerFor("application").get("canSignUp");
      if (!this.siteSettings.login_required) {
        this.replaceWith("discovery.latest").then(e => {
          if (canSignUp) {
            (0, _runloop.next)(() => e.send("showCreateAccount"));
          }
        });
      } else {
        this.replaceWith("login").then(e => {
          if (canSignUp) {
            (0, _runloop.next)(() => e.send("showCreateAccount"));
          }
        });
      }
    }
  });
  var _default = SignupRoute;
  _exports.default = _default;
});