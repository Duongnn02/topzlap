define("discourse/routes/email-login", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/ajax"], function (_exports, _discourse, _I18n, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    titleToken() {
      return _I18n.default.t("login.title");
    },
    model(params) {
      return (0, _ajax.ajax)(`/session/email-login/${params.token}.json`);
    }
  });
  _exports.default = _default;
});