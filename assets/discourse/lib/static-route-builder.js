define("discourse/lib/static-route-builder", ["exports", "discourse/lib/url", "discourse/routes/discourse", "I18n", "discourse/models/static-page"], function (_exports, _url, _discourse, _I18n, _staticPage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/routes/discourse",0,"I18n",0,"discourse/models/static-page"eaimeta@70e063a35619d71f
  const configs = {
    faq: "faq_url",
    tos: "tos_url",
    privacy: "privacy_policy_url"
  };
  function _default(page) {
    return _discourse.default.extend({
      renderTemplate() {
        this.render("static");
      },
      beforeModel(transition) {
        const configKey = configs[page];
        if (configKey && this.siteSettings[configKey].length > 0) {
          transition.abort();
          _url.default.redirectTo(this.siteSettings[configKey]);
        }
      },
      activate() {
        this._super(...arguments);
        _url.default.jumpToElement(document.location.hash.slice(1));
      },
      model() {
        return _staticPage.default.find(page);
      },
      setupController(controller, model) {
        this.controllerFor("static").set("model", model);
      },
      titleToken() {
        return _I18n.default.t(page);
      },
      actions: {
        didTransition() {
          this.controllerFor("application").set("showFooter", true);
          return true;
        }
      }
    });
  }
});