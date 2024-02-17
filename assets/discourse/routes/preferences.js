define("discourse/routes/preferences", ["exports", "discourse/routes/restricted-user", "I18n", "@ember/service"], function (_exports, _restrictedUser, _I18n, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/restricted-user",0,"I18n",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _restrictedUser.default.extend({
    router: (0, _service.inject)(),
    model() {
      return this.modelFor("user");
    },
    titleToken() {
      let controller = this.controllerFor(this.router.currentRouteName);
      let subpageTitle = controller?.subpageTitle;
      return subpageTitle ? `${subpageTitle} - ${_I18n.default.t("user.preferences")}` : _I18n.default.t("user.preferences");
    }
  });
  _exports.default = _default;
});