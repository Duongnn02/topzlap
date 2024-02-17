define("discourse/components/login-modal", ["exports", "@ember/component", "discourse/lib/cookie", "@ember/runloop"], function (_exports, _component, _cookie, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"discourse/lib/cookie",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    didInsertElement() {
      this._super(...arguments);
      const prefillUsername = $("#hidden-login-form input[name=username]").val();
      if (prefillUsername) {
        this.set("loginName", prefillUsername);
        this.set("loginPassword", $("#hidden-login-form input[name=password]").val());
      } else if ((0, _cookie.default)("email")) {
        this.set("loginName", (0, _cookie.default)("email"));
      }
      (0, _runloop.schedule)("afterRender", () => {
        $("#login-account-password, #login-account-name, #login-second-factor").keydown(e => {
          if (e.key === "Enter") {
            this.action();
          }
        });
      });
    }
  });
  _exports.default = _default;
});