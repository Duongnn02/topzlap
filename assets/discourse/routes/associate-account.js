define("discourse/routes/associate-account", ["exports", "discourse/routes/discourse", "discourse/lib/ajax", "@ember/runloop", "discourse/lib/ajax-error", "discourse/lib/show-modal", "discourse/lib/cookie"], function (_exports, _discourse, _ajax, _runloop, _ajaxError, _showModal, _cookie) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/ajax",0,"@ember/runloop",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal",0,"discourse/lib/cookie"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    beforeModel(transition) {
      if (!this.currentUser) {
        (0, _cookie.default)("destination_url", transition.intent.url);
        return this.replaceWith("login");
      }
      const params = this.paramsFor("associate-account");
      this.replaceWith(`preferences.account`, this.currentUser).then(() => (0, _runloop.next)(() => (0, _ajax.ajax)(`/associate/${encodeURIComponent(params.token)}.json`).then(model => (0, _showModal.default)("associate-account-confirm", {
        model
      })).catch(_ajaxError.popupAjaxError)));
    }
  });
  _exports.default = _default;
});