define("discourse/routes/group-requests", ["exports", "discourse/routes/discourse", "I18n"], function (_exports, _discourse, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    titleToken() {
      return _I18n.default.t("groups.requests.title");
    },
    model(params) {
      this._params = params;
      return this.modelFor("group");
    },
    setupController(controller, model) {
      this.controllerFor("group").set("showing", "requests");
      controller.setProperties({
        model,
        filterInput: this._params.filter
      });
      controller.findRequesters(true);
    }
  });
  _exports.default = _default;
});