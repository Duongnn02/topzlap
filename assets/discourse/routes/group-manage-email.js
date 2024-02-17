define("discourse/routes/group-manage-email", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    beforeModel() {
      // cannot configure IMAP without SMTP being enabled
      if (!this.siteSettings.enable_smtp) {
        return this.transitionTo("group.manage.profile");
      }
    },
    titleToken() {
      return _I18n.default.t("groups.manage.email.title");
    }
  });
  _exports.default = _default;
});