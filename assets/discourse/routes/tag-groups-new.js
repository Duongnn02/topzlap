define("discourse/routes/tag-groups-new", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    showFooter: true,
    beforeModel() {
      if (!this.siteSettings.tagging_enabled) {
        this.transitionTo("tagGroups");
      }
    },
    model() {
      return this.store.createRecord("tagGroup", {
        name: _I18n.default.t("tagging.groups.new_name")
      });
    }
  });
  _exports.default = _default;
});